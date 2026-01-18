import mongoose, { Schema, Document } from 'mongoose';

export interface IImage extends Document {
    user: mongoose.Types.ObjectId;
    album?: mongoose.Types.ObjectId;
    url: string;
    storageId?: string; // Firebase Storage ID or path
    prompt?: string; // The prompt used to generate this image, if applicable
    metadata?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}

const ImageSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    album: { type: Schema.Types.ObjectId, ref: 'Album' },
    url: { type: String, required: true },
    storageId: { type: String },
    prompt: { type: String },
    metadata: { type: Map, of: Schema.Types.Mixed },
}, { timestamps: true });

export default mongoose.model<IImage>('Image', ImageSchema);
