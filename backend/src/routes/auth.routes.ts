import express from 'express';
import { registerUser, login, forgotPassword, resetPassword } from '../controllers';
import validateRequest from '../middleware/validationMiddleware';

import { userRegistrationSchema } from '../validation/userValidation';
import catchAsync from '../util/catchAsync';

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Auth page");
});

router.post('/register', validateRequest(userRegistrationSchema), catchAsync(registerUser));
router.post('/login', catchAsync(login));

router.post('/forgotPassword', catchAsync(forgotPassword));
router.patch('/resetPassword/:token', catchAsync(resetPassword));

export default router;