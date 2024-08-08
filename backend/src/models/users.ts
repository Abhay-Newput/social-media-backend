import { number } from 'joi';
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  friends: mongoose.Types.ObjectId[];
  passwordResetToken: string;
  passwordResetExpires: Date | number;
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  friends: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
});

export default mongoose.model<IUser>('User', userSchema);

