import express from 'express';
import { registerUserAPI, loginAPI } from '../controllers';
import validateRequest from '../middleware/validationMiddleware';

import { userRegistrationSchema } from '../validation/userValidation';
import catchAsync from '../util/catchAsync';

const router = express.Router();

router.get("/", (req, res) => { 
    res.send("Auth page");
});

router.post('/register', validateRequest(userRegistrationSchema), catchAsync(registerUserAPI));
router.post('/login', catchAsync(loginAPI));

export default router;