import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import ApiError from '../util/apiError';

interface ValidationSchema {
  params?: ObjectSchema<any>;
  query?: ObjectSchema<any>;
  body?: ObjectSchema<any>;
}


const validateRequest = (schema: ValidationSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (schema.params) {
      const { error } = schema.params.validate(req.params);
      if (error) {
        throw new ApiError(error.details[0].message, 400);
      }
    }
    if (schema.query) {
      const { error } = schema.query.validate(req.query);
      if (error) {
        throw new ApiError(error.details[0].message, 400);
      }
    }
    if (schema.body) {
      const { error } = schema.body.validate(req.body);
      if (error) {
        throw new ApiError(error.details[0].message, 400);
      }
    }
    next();
  };
};

  // return (req: Request, res: Response, next: NextFunction) => {
  //   const { error } = schema.validate(req.body, { abortEarly: false });

  //   if (error) {
  //     // return res.status(400).json({ message: 'Validation error', errors: error.details });
  //     throw new ApiError(error.message, 400);
  //   }

  //   next();
  // };
// };

export default validateRequest;
