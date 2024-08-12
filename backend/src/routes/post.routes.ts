import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { createPost, likePost, dislikePost, deletePost } from '../controllers';
import catchAsync from '../util/catchAsync';

import multer from 'multer';
const upload = multer({ dest: 'uploads/' });


const router = express.Router();

router.post('/', protect, upload.single('image'), catchAsync(createPost));
router.delete('/', protect, catchAsync(deletePost));

router.post('/like', protect, catchAsync(likePost));
router.post('/dislike', protect, catchAsync(dislikePost));

export default router;