import { Request, Response } from 'express';
import * as authService from '../services/authServices';

export const registerUser = async (req: Request, res: Response) => {
  const user = await authService.registerUser(req.body);
  res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  const data =  await authService.login(req.body);
  res.status(200).json({message: `${data.username} logged in successfully`, token: data.token});
};

