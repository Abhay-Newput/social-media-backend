import { IUser } from "models/users";

export interface AuthRequest extends Request {
    user?: IUser;
}