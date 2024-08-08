import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users';
import ApiError from '../util/apiError';


const generateToken = (id: string) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const registerUser = async (data: any) => {
    const { username, email, password } = data;
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      throw new ApiError('User already exists', 403);
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      return {
        _id: newUser._id.toString(),
        username: newUser.username,
        email: newUser.email,
        token: generateToken(newUser._id.toString()),
      };
    } catch (error) {
      console.error('Error in registerUser:', error.message);
      throw new ApiError('Internal Server Error', 500);
    }
};


export const login = async(data: any) => {
    const { email, password } = data;
    const user = await User.findOne({ email });
  
    if (user && (await bcrypt.compare(password, user.password))) {
        return {
            _id: (user._id as any).toString(),
            username: user.username,
            email: user.email,
            token: generateToken((user._id).toString()),
        } ;
    } else {
        throw new ApiError('Invalid email or password', 404);
    }
}