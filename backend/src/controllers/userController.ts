import { Request, Response } from 'express';
import * as userServices from '../services/userServices';
import ApiError from '../util/apiError';

interface AuthRequest extends Request {
  user?: any;
}

export const updateUserProfile = async (req: AuthRequest, res: Response) => {
  
    const user = await userServices.updateUserProfile(req.user, req.body);
    res.status(201).json(user);
};

export const addFriend = async (req: AuthRequest, res: Response) => {

    const userId = req.user._id;

    const {friendId}  = req.body;
    
    if (!userId || !friendId) {
        throw new ApiError('Friend ID is required', 400);
    }
    const result = await userServices.addFriend(userId, friendId);
    res.status(201).json(result);
};

export const removeFriend = async (req: AuthRequest, res: Response) => {

    const userId = req.user._id;

    const {friendId}  = req.body;
    
    if (!userId || !friendId) {
        throw new ApiError('Friend ID is required', 400);
    }
    const result = await userServices.removeFriend(userId, friendId);
    res.status(201).json(result);
};
