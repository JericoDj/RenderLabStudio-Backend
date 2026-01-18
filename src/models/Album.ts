import mongoose, { Schema, Document } from 'mongoose';

export interface IAlbum extends Document {
    user: mongoose.Types.ObjectId;
    title: string;
    description?: string;
    coverImage?: string; // URL
    createdAt: Date;
    updatedAt: Date;
}

const AlbumSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    coverImage: { type: String },
}, { timestamps: true });

export default mongoose.model<IAlbum>('Album', AlbumSchema);
