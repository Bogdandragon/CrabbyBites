import Joi from 'joi';
import joidate from '@joi/date';

const joi = Joi.extend(joidate);

const login = joi.object({
    username: joi.string().required().messages({
        'string.empty': 'Username is required'
    }),
    password: joi.string().required().messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password is required'
    })
});

const register = joi.object({
    email: joi.string().email().required().messages({
        'string.email': 'Email must be a valid email',
        'string.empty': 'Email is required'
    }),
    username: joi.string().required().messages({
        'string.empty': 'Username is required'
    }),
    password: joi.string().required().messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password is required'
    }),
    confirmPassword: joi.string().required().valid(joi.ref('password')).messages({
        'string.base': 'Confirm password must be a string',
        'string.empty': 'Confirm password is required',
        'any.only': 'Passwords must match'
    })
});

const validators = {
    login,
    register
}

export default validators;