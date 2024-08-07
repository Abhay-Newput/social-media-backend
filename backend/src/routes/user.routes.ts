import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { updateUserProfileAPI, addFriendAPI, removeFriendAPI } from '../controllers';

import multer from 'multer';
import catchAsync from '../util/catchAsync';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get("/", (req, res) => {
    res.send("User page");
});

router.put('/profile', protect, upload.single('profilePicture'), catchAsync(updateUserProfileAPI));

router.post('/friend', protect, catchAsync(addFriendAPI));
router.delete('/friend', protect, catchAsync(removeFriendAPI));

export default router;