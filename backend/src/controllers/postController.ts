import { Request, Response } from 'express';
import * as postServices from '../services/postServices';

interface AuthRequest extends Request {
  user?: any;
}

export const createPost = async (req: AuthRequest, res: Response) => {
  const { title, description } = req.body;
  const userId = req.user._id;
  const image = req.file?.path;

  const result = await postServices.createPost({ userId, title, description, image });
  res.status(201).json(result);
};

export const deletePost = async (req: AuthRequest, res: Response) => {

  const { postId } = req.body;
  const userId = req.user._id;

  const result = await postServices.deletePost(postId, userId);
  res.status(200).json(result);
};

export const likePost = async (req: AuthRequest, res: Response) => {
  const { postId } = req.body;
  const userId = req.user._id;

  await postServices.likePost({ postId, userId });
  res.status(201).json({ message: 'Post liked successfully' });
};

export const dislikePost = async (req: AuthRequest, res: Response) => {
  const { postId } = req.body;
  const userId = req.user._id;

  await postServices.dislikePost({ postId, userId });
  res.status(200).json({ message: 'Post disliked successfully' });
};
