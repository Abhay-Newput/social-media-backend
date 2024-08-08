import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users';
import ApiError from '../util/apiError';
import crypto from 'crypto';
import sendEmail from '../util/sendEmail';


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


export const sendForgotPasswordEmail = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError('No user found with that email', 404);
  }

  try{
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    
    user.passwordResetToken = resetTokenHash;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; 
    await user.save();
    
    // const resetURL = `${protocol}://${host}/api/v1/users/resetPassword/${resetToken}`;
    const message = `Forgot your password? Here is your reset Token: ${resetToken}`;
    
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 minutes)',
      message,
    });
    return { message: 'Token sent to email!' };
  }catch(error){
    console.error('Error in sendForgotPasswordEmail:', error.message);
    throw new ApiError('Internal Server Error', 500);
  }
};

export const resetUserPassword = async (token: string, password: string) => {
  
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError('Token is invalid or has expired', 400);
  }

 try{
   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(password, salt);
   user.passwordResetToken = undefined;
   user.passwordResetExpires = undefined;
   await user.save();
  
   const jwtToken = generateToken(user._id.toString());
   
   return { token: jwtToken };
  }catch(error){
    console.error('Error in resetUserPassword:', error.message);
    throw new ApiError('Internal Server Error', 500);
  }
};