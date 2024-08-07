import { Request, Response } from 'express';
import { login, registerUser } from '../services/authServices';

export const registerUserAPI = async (req: Request, res: Response) => {
  const user = await registerUser(req.body);
  console.log(user);
  res.status(201).json(user);
};

export const loginAPI = async (req: Request, res: Response) => {
  const loginUser =  await login(req.body);
  res.status(200).json({message: `${loginUser.username} logged in successfully`, token: loginUser.token});
};

