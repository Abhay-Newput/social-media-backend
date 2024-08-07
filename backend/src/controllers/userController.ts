import { Request, Response } from 'express';
import { updateUserProfile, addFriend, removeFriend } from '../services/userServices';
import ApiError from '../util/apiError';

interface AuthRequest extends Request {
  user?: any;
}

export const updateUserProfileAPI = async (req: AuthRequest, res: Response) => {
  
    const user = await updateUserProfile(req.user, req.body);
    res.status(201).json(user);
};

export const addFriendAPI = async (req: AuthRequest, res: Response) => {

    const userId = req.user._id;

    const {friendId}  = req.body;
    
    if (!userId || !friendId) {
        throw new ApiError('Friend ID is required', 400);
    }
    const result = await addFriend(userId, friendId);
    res.status(201).json(result);
};

export const removeFriendAPI = async (req: AuthRequest, res: Response) => {

    const userId = req.user._id;

    const {friendId}  = req.body;
    
    if (!userId || !friendId) {
        throw new ApiError('Friend ID is required', 400);
    }
    const result = await removeFriend(userId, friendId);
    res.status(201).json(result);
};
