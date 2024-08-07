import { Request, Response } from 'express';
import { createPost, dislikePost, likePost, deletePost } from '../services/postServices';

interface AuthRequest extends Request {
    user?: any;
  }

export const createPostAPI = async (req: AuthRequest, res: Response) => {
        const { title, description } = req.body;
        const userId = req.user._id;
        const image = req.file?.path;
    
        const createdPost = await createPost({ userId, title, description, image });
        res.status(201).json(createdPost);   
};

export const deletePostAPI = async (req: AuthRequest, res: Response) => {
      
      const { postId } = req.body;
      const userId = req.user._id;
  
      const result = await deletePost(postId, userId);
      res.status(200).json(result);
};

export const likePostAPI = async (req: AuthRequest, res: Response) => {
  const { postId } = req.body;
  const userId = req.user._id;

  await likePost({ postId, userId });
  res.status(201).json({ message: 'Post liked successfully' });
};

export const dislikePostAPI = async (req: AuthRequest, res: Response) => {
        const { postId } = req.body;
        const userId = req.user._id;

        await dislikePost({ postId, userId });
        res.status(200).json({ message: 'Post disliked successfully' });
};
