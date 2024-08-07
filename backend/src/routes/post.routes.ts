import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { createPostAPI, likePostAPI, dislikePostAPI, deletePostAPI } from '../controllers';
import catchAsync from '../util/catchAsync';

import multer from 'multer';
const upload = multer({ dest: 'uploads/' });


const router = express.Router();

router.get("/", (req, res) => {
    res.send("Post page");
});
router.post('/', protect, upload.single('image'), catchAsync(createPostAPI));
router.delete('/', protect, upload.single('image'), catchAsync(deletePostAPI));

router.post('/like', protect, catchAsync(likePostAPI));
router.post('/dislike', protect, catchAsync(dislikePostAPI));

export default router;