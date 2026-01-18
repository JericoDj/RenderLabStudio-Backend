import mongoose, { Schema, Document } from 'mongoose';

export interface IPlan extends Document {
    name: string;
    price: number;
    durationInDays: number;
    limits: {
        images: number; // -1 for unlimited
        videos: number;
        messages: number;
    };
    features: string[];
    createdAt: Date;
    updatedAt: Date;
}

const PlanSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    durationInDays: { type: Number, default: 30 },
    limits: {
        images: { type: Number, default: 0 },
        videos: { type: Number, default: 0 },
        messages: { type: Number, default: 0 },
    },
    features: [{ type: String }],
}, { timestamps: true });

export default mongoose.model<IPlan>('Plan', PlanSchema);
