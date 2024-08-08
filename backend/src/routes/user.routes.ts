import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { updateUserProfile, addFriend, removeFriend } from '../controllers';

import multer from 'multer';
import catchAsync from '../util/catchAsync';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get("/", (req, res) => {
    res.send("User page");
});

router.put('/profile', protect, upload.single('profilePicture'), catchAsync(updateUserProfile));

router.post('/friend', protect, catchAsync(addFriend));
router.delete('/friend', protect, catchAsync(removeFriend));

export default router;