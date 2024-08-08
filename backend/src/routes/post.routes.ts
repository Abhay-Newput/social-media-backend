import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { createPost, likePost, dislikePost, deletePost } from '../controllers';
import catchAsync from '../util/catchAsync';

import multer from 'multer';
const upload = multer({ dest: 'uploads/' });


const router = express.Router();

router.get("/", (req, res) => {
    res.send("Post page");
});
router.post('/', protect, upload.single('image'), catchAsync(createPost));
router.delete('/', protect, upload.single('image'), catchAsync(deletePost));

router.post('/like', protect, catchAsync(likePost));
router.post('/dislike', protect, catchAsync(dislikePost));

export default router;