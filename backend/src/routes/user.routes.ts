import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { updateUserProfile, addFriend, removeFriend } from '../controllers';

import multer from 'multer';
import catchAsync from '../util/catchAsync';
import validateRequest from '../middleware/validationMiddleware';
import { userUpdateSchema } from '../validation/userValidation';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();


router.put('/profile', protect, validateRequest(userUpdateSchema), upload.single('profilePicture'), catchAsync(updateUserProfile));

router.post('/friend', protect, catchAsync(addFriend));
router.delete('/friend', protect, catchAsync(removeFriend));

export default router;