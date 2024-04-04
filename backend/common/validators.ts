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

const validators = {
    login
}

export default validators;