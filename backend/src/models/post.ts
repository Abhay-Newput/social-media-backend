import mongoose, { Schema, Document } from 'mongoose';

interface IPost extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  description: string;
  image?: string;
  likes: mongoose.Types.ObjectId[];
}

const postSchema: Schema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model<IPost>('Post', postSchema);
