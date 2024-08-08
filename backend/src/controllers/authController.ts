import { Request, Response } from 'express';
import * as authService from '../services/authServices';
import ApiError from '../util/apiError';

export const registerUser = async (req: Request, res: Response) => {
  const user = await authService.registerUser(req.body);
  res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  const data =  await authService.login(req.body);
  res.status(200).json({message: `${data.username} logged in successfully`, token: data.token});
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
    
  const result = await authService.sendForgotPasswordEmail(email);
  res.status(200).json(result);
};


export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;
  
  const result = await authService.resetUserPassword(token, password);
  res.status(200).json({'Password reset successfully new Token': result});
};