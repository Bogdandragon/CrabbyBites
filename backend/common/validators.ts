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


/*
interface IRecipe{
    _id : mongoose.Types.ObjectId,
    name: string,
    time: number,
    difficulty: DIFFICULTY,
    portions: number,
    picture: string,
    category: string,
    description: string,
    ingredients: {
        name: string,
        quantity: number,
        measurement: string
    }[],
    instructions: string[],
    status: STATUS,
    rejectionReason: string,
    rating: number,
    reportNo: number,
    userId: mongoose.Types.ObjectId
}
*/
const addRecipe = joi.object({
    name : joi.string().required().messages({
        'string.empty': 'Name is required'
    }),
    time : joi.number().required().messages({
        'number.base': 'Time must be a number',
        'number.empty': 'Time is required'
    }),
    difficulty : joi.string().valid('EASY', 'MEDIUM', 'HARD').required().messages({
        'string.base': 'Difficulty must be a string',
        'string.empty': 'Difficulty is required'
    }),
    portions : joi.number().required().messages({
        'number.base': 'Portions must be a number',
        'number.empty': 'Portions is required'
    }),
    picture : joi.string().required().messages({
        'string.empty': 'Picture is required'
    }),
    encoding : joi.string().valid('png', 'jpg', 'jpeg').required().messages({
        'string.base': 'Encoding must be a string',
        'string.empty': 'Encoding is required'
    }),
    category : joi.string().required().messages({
        'string.empty': 'Category is required'
    }),
    description : joi.string().required().messages({
        'string.empty': 'Description is required'
    }),
    ingredients : joi.array().items(joi.object({
        name : joi.string().required().messages({
            'string.empty': 'Name is required'
        }),
        quantity : joi.number().required().messages({
            'number.base': 'Quantity must be a number',
            'number.empty': 'Quantity is required'
        }),
        measurement : joi.string().required().messages({
            'string.empty': 'Measurement is required'
        })
    })).required().messages({
        'array.base': 'Ingredients must be an array',
        'array.empty': 'Ingredients is required'
    }),
    instructions : joi.array().items(joi.string()).required().messages({
        'array.base': 'Instructions must be an array',
        'array.empty': 'Instructions is required'
    }),
    status : joi.forbidden(),
    // rejection reaseon only if status is REJECTED
    rejectionReason : joi.forbidden(),

    rating : joi.forbidden(),
    reportNo : joi.forbidden(),

    userId : joi.string().required().messages({ 
        'string.empty': 'User Id is required'
    })
});





const validators = {
    login,
    addRecipe
}

export default validators;