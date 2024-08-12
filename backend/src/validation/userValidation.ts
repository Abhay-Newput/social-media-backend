import * as Joi from 'joi';


export const userUpdateSchema = {
  params: Joi.object({
    id: Joi.string().required()
  }),
  body: Joi.object({
    username: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string()
      .pattern(new RegExp('^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
  })
};



// Joi.object({
//     username: Joi.string().required(),
//     email: Joi.string().required().email(),
//     password: Joi.string()
//     .pattern(new RegExp('^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
//     .required()
// });

