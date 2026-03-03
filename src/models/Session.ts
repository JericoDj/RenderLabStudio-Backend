import mongoose, { Schema, Document } from 'mongoose';

export interface ISession extends Document {
    user: mongoose.Types.ObjectId;
    title: string;
    preferences: {
        video: Record<string, any>;
        image: Record<string, any>;
        chat: Record<string, any>;
    };
    createdAt: Date;
    updatedAt: Date;
}

const SessionSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, default: 'New Session' },
    preferences: {
        video: { type: Schema.Types.Mixed, default: {} },
        image: { type: Schema.Types.Mixed, default: {} },
        chat: { type: Schema.Types.Mixed, default: {} },
    },
}, { timestamps: true });

export default mongoose.model<ISession>('Session', SessionSchema);
