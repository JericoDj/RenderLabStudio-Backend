import { Router } from 'express';
import * as PolarController from '../controllers/PolarController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

// Used by the frontend client
router.post('/checkout', authMiddleware, PolarController.createCheckoutSession);
router.post('/portal', authMiddleware, PolarController.customerPortal);
router.get('/subscription', authMiddleware, PolarController.getSubscription);
router.delete('/subscription', authMiddleware, PolarController.cancelSubscription);

export default router;
