import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/users';
import ApiError from '../util/apiError';
import { IUser } from '../models/users';


interface AuthRequest extends Request {
  user?: IUser;
}

const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      return next(new ApiError('Not authorized, token failed', 401));
    }
  }
  if (!token) {
    return next(new ApiError('Not authorized, no token', 401));
  }
};

export { protect };
