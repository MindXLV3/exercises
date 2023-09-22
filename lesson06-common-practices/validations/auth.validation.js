import Joi from 'joi';

export const login = {
    body: {
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    }
}

export const signup = {
    body: {
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'vn'] } }).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        fullname: Joi.string()
        .min(3)
        .max(30)
        .required(),
    }
}

export const verify = {
    body: {
        token: Joi.string()
        .min(3)
        .max(500)
        .required(),
    }
}