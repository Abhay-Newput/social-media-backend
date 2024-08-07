import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import ApiError from '../util/apiError';

const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      // return res.status(400).json({ message: 'Validation error', errors: error.details });
      throw new ApiError(error.message, 400);
    }

    next();
  };
};

export default validateRequest;
