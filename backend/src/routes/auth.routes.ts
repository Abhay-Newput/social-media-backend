import express from 'express';
import { registerUser, login, forgotPassword, resetPassword } from '../controllers';
import validateRequest from '../middleware/validationMiddleware';

import { forgotPasswordSchema, resetPasswordSchema, userLoginSchema, userRegistrationSchema } from '../validation/authValidation';
import catchAsync from '../util/catchAsync';

const router = express.Router();


router.post('/register', validateRequest(userRegistrationSchema), catchAsync(registerUser));
router.post('/login', validateRequest(userLoginSchema), catchAsync(login));

router.post('/forgotPassword', validateRequest(forgotPasswordSchema), catchAsync(forgotPassword));
router.patch('/resetPassword/:token', validateRequest(resetPasswordSchema), catchAsync(resetPassword));

export default router;