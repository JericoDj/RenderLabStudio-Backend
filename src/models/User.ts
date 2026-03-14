import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password?: string;
  googleId?: string;
  name?: string;
  otp?: string;
  otpExpires?: Date;
  polarCustomerId?: string;
  polarSubscriptionId?: string;
  plan?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  name: { type: String },
  otp: { type: String },
  otpExpires: { type: Date },
  polarCustomerId: { type: String },
  polarSubscriptionId: { type: String },
  plan: { type: Schema.Types.ObjectId, ref: 'Plan' },
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
