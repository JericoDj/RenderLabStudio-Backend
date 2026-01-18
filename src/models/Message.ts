import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
    session: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId; // Make sure to link to user as well for easier querying
    role: 'user' | 'assistant' | 'system';
    content: string;
    response?: string; // Optional field if we want to store pairs, though listing messages is usually linear
    createdAt: Date;
    updatedAt: Date;
}

const MessageSchema: Schema = new Schema({
    session: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
    content: { type: String, default: '' }, // Can be empty string as requested
    response: { type: String }, // Optional: If we want to store the pair in one document (User says X, AI says Y). Ideally, standard chat is one doc per message. 
    // But the prompt says "message linked to user or response". 
    // I will stick to individual messages, but keep this field if the user wants paired structure.
}, { timestamps: true });

export default mongoose.model<IMessage>('Message', MessageSchema);
