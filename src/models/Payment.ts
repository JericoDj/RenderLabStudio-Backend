import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
    user: mongoose.Types.ObjectId;
    plan?: mongoose.Types.ObjectId;
    amount: number;
    currency: string;
    status: 'pending' | 'completed' | 'failed';
    providerId?: string; // e.g. Stripe PaymentIntent ID
    metadata?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}

const PaymentSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    plan: { type: Schema.Types.ObjectId, ref: 'Plan' },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: 'USD' },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    providerId: { type: String },
    metadata: { type: Map, of: String },
}, { timestamps: true });

export default mongoose.model<IPayment>('Payment', PaymentSchema);
