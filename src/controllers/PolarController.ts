import { Request, Response } from 'express';
import { Polar } from '@polar-sh/sdk';
import User from '../models/User';
import Plan from '../models/Plan';

const polar = new Polar({
    accessToken: process.env.POLAR_ACCESS_TOKEN || '',
    server: 'sandbox', // Use sandbox by default for testing
});

export const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const { productId } = req.body;
        // User from auth middleware
        const userId = (req as any).user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const checkout = await polar.checkouts.create({
            products: [productId],
            successUrl: `${process.env.FRONTEND_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
            customerId: user.polarCustomerId || undefined,
            customerEmail: user.email,
            customerName: user.name,
            metadata: {
                userId: user._id.toString()
            }
        });

        res.json({ url: checkout.url });
    } catch (error: any) {
        console.error('Checkout error:', error);
        res.status(500).json({ message: error.message });
    }
};

export const customerPortal = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const user = await User.findById(userId);

        if (!user || !user.polarCustomerId) {
            return res.status(400).json({ message: 'User does not have a Polar customer ID' });
        }

        const session = await polar.customerSessions.create({
            customerId: user.polarCustomerId,
        });

        res.json({ url: session.customerPortalUrl });
    } catch (error: any) {
        console.error('Portal error:', error);
        res.status(500).json({ message: error.message });
    }
};

export const getSubscription = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const user = await User.findById(userId);

        if (!user || !user.polarSubscriptionId) {
            return res.status(404).json({ message: 'No active subscription found' });
        }

        const subscription = await polar.subscriptions.get({ id: user.polarSubscriptionId });
        res.json({ subscription });
    } catch (error: any) {
        console.error('Get subscription error:', error);
        res.status(500).json({ message: error.message });
    }
};

export const cancelSubscription = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const user = await User.findById(userId);

        if (!user || !user.polarSubscriptionId) {
            return res.status(404).json({ message: 'No active subscription found to cancel' });
        }

        const subscription = await polar.subscriptions.revoke({ id: user.polarSubscriptionId });
        
        // Optimistically remove from user, though webhook will handle this too
        user.polarSubscriptionId = undefined;
        user.plan = undefined;
        await user.save();

        res.json({ message: 'Subscription cancelled successfully', subscription });
    } catch (error: any) {
        console.error('Cancel subscription error:', error);
        res.status(500).json({ message: error.message });
    }
};

export const handleWebhook = async (req: Request, res: Response) => {
    const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
        return res.status(500).json({ message: 'Webhook secret not configured' });
    }

    try {
        // req.body should be a Buffer because of express.raw()
        const payload = req.body.toString();
        const signature = req.headers['webhook-signature'] as string;
        
        let event;
        try {
            // Note: in version 0.46, polar.validateWebhook uses standard webhooks
            // and often auto-reads POLAR_WEBHOOK_SECRET from env
            process.env.POLAR_WEBHOOK_SECRET = webhookSecret;
            event = await polar.validateWebhook({
                request: {
                    body: payload,
                    headers: req.headers as Record<string, string>,
                    url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
                    method: req.method,
                }
            });
        } catch (err: any) {
            console.error('Webhook signature verification failed.', err.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        // Handle the event
        switch (event.type) {
            case 'subscription.created':
            case 'subscription.updated': {
                const subscription = event.data;
                const customerId = subscription.customerId;
                const metadata = subscription.metadata as Record<string, any>;
                const userId = metadata?.userId;
                const productId = subscription.productId; // Note: Product mapping to Plan needed
                
                if (userId) {
                    await User.findByIdAndUpdate(userId, {
                        polarCustomerId: customerId,
                        polarSubscriptionId: subscription.id,
                        // We would ideally look up the plan by productId, this is a placeholder
                    });
                }
                break;
            }
            case 'subscription.revoked': {
                const subscription = event.data;
                const userId = (subscription.metadata as any)?.userId;
                
                if (userId) {
                    await User.findByIdAndUpdate(userId, {
                        $unset: { plan: 1, polarSubscriptionId: 1 } 
                    });
                }
                break;
            }
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        res.status(200).send('Webhook processed');
    } catch (error: any) {
        console.error('Webhook handling error:', error);
        res.status(500).json({ message: error.message });
    }
};
