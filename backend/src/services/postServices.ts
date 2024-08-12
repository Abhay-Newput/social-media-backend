import Post from '../models/post';
import ApiError from '../util/apiError';

export const createPost: any = async (data: { userId: string, title: string, description: string, image?: string }) => {

  const { userId, title, description, image } = data;
  const post = new Post({
    user: userId,
    title,
    description,
    image,
  });

  const createdPost = await post.save();
  return createdPost;
};

export const deletePost = async (postId: string, userId: string) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError('Post not found', 404);
  }

  if (post.user.toString() !== userId.toString()) {
    throw new ApiError('User not authorized to delete this post', 403);
  }

  await Post.deleteOne({ _id: postId });
  return { message: 'Post deleted successfully' };
};

export const likePost: any = async (data: { postId: string, userId: any }) => {

  const { postId, userId } = data;

  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError('Post not found', 404);
  }

  if (post.likes.includes(userId)) {
    throw new ApiError('Post already liked', 400);
  }

  post.likes.push(userId);
  await post.save();
  return post;
}

export const dislikePost: any = async (data: { postId: string, userId: any }) => {

  const { postId, userId } = data;

  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError('Post not found', 404);
  }

  if (!post.likes.includes(userId)) {
    throw new ApiError('Post not liked', 400);
  }

  const index = post.likes.indexOf(userId);
  post.likes.splice(index, 1);
  await post.save();

  return post;
}
