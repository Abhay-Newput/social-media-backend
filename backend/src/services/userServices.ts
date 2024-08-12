import bcrypt from 'bcryptjs';
import User from '../models/users';
import ApiError from '../util/apiError';


export const updateUserProfile = async (data: any, body: any) => {
  try {
    if (!data) {
      throw new ApiError('User not authenticated', 401);
    }

    const user = await User.findById(data._id);

    if (!user) {
      throw new ApiError('User not found', 404);
    }

    user.username = body.username || user.username;
    user.email = body.email || user.email;

    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(body.password, salt);
    }

    if (body.file) {
      user.profilePicture = body.file.path;
    }

    const updatedUser = await user.save();

    return {
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      profilePicture: updatedUser.profilePicture,
    };
  } catch (error) {
    console.error('Error in updateUserProfileAPI:', error.message);
    throw new ApiError('Failed to update user profile', 400);
  }

}

export const addFriend = async (userId: string, friendId: string) => {
  const user = await User.findById(userId);
  const friend = await User.findById(friendId);

  if (userId === friendId) {
    throw new ApiError('You cannot add yourself as a friend', 400);
  }

  if (!user) {
    throw new ApiError('User not found', 404);
  }

  if (!friend) {
    throw new ApiError('Friend not found', 404);
  }

  if (user.friends.includes(friend._id as any)) {
    throw new ApiError('Friend already added', 400);
  }

  user.friends.push(friend._id as any);
  await user.save();

  return { message: 'Friend added successfully' };
}

export const removeFriend = async (userId: string, friendId: string) => {

  const user = await User.findById(userId);
  const friend = await User.findById(friendId);

  if (userId === friendId) {
    throw new ApiError('You cannot remove yourself as a friend', 400);
  }

  if (!user) {
    throw new ApiError('User not found', 404);
  }

  if (!friend) {
    throw new ApiError('Friend not found', 404);
  }

  const friendIndex = user.friends.indexOf(friend._id as any);

  if (friendIndex === -1) {
    throw new ApiError('Friend not found in your friends list', 400);
  }
  user.friends.splice(friendIndex, 1);

  await user.save();

  return { message: `Friend removed successfully` };
};