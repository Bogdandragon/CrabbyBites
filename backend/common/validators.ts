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
    username: joi.string().required().min(6).messages({
        'string.empty': 'Username is required'
    }),
    password: joi.string().required().min(12).messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password is required'
    }),
    confirmPassword: joi.string().required().valid(joi.ref('password')).messages({
        'string.base': 'Confirm password must be a string',
        'string.empty': 'Confirm password is required',
        'any.only': 'Passwords must match'
    })
});

const status = joi.object({
    id: joi.string().required().messages({
        'string.empty': 'Id is required'
    }),
    status: joi.string().required().valid('APPROVED', 'REJECTED').messages({
        'string.empty': 'Status is required',
        'any.only': 'Status must be either APPROVED or REJECTED'
    })
});

const review = joi.object({
    id: joi.string().required().messages({
        'string.empty': 'Id is required'
    }),
    rating: joi.number().required().precision(1).min(1).max(5).messages({
        'number.base': 'Rating must be a number',
        'number.empty': 'Rating is required',
        'number.min': 'Rating must be at least 1',
        'number.max': 'Rating must be at most 5',
        'number.precision': 'Rating must have at most one decimal'
    }),
    comment: joi.string().required().allow("")
});

const validators = {
    login,
    register,
    status,
    review
}

export default validators;