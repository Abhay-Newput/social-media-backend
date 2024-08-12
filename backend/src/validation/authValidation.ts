import * as Joi from 'joi';


export const userRegistrationSchema = {
    body: Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string()
            .pattern(new RegExp('^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
            .required()
    })
};


export const userLoginSchema = {
    body: Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string()
            .pattern(new RegExp('^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
            .required()
    })
};

export const forgotPasswordSchema = {
    body: Joi.object({
        email: Joi.string().required().email()
    })
}

export const resetPasswordSchema = {
    params: Joi.object({
        token: Joi.string().required()
    }),
    body: Joi.object({
        password: Joi.string()
            .pattern(new RegExp('^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
            .required()
    })
}