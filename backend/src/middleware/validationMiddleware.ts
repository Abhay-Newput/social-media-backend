import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import * as Joi from 'joi';
import ApiError from '../util/apiError';
import { pick } from '../util/pick';

interface ValidationSchema {
  params?: ObjectSchema<any>;
  query?: ObjectSchema<any>;
  body?: ObjectSchema<any>;
}


export const validateRequest = (schema: ValidationSchema) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    return next(new ApiError(error.message || 'Some Keys are missing', 400));
  }
  Object.assign(req, value);
  return next();
};
export default validateRequest;
