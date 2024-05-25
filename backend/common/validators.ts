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

const report = joi.object({
    id: joi.string().required().messages({
        'string.empty': 'Id is required'
    }),
    comment: joi.string().required().messages({
        'string.empty': 'Comment is required'
    }),
    type: joi.string().required().valid("RECIPE", "REVIEW").messages({
        'string.empty': 'Type is required',
        'any.only': 'Type must be either RECIPE or REVIEW'
    })
});

const recipe = joi.object({
    id: joi.string().required().messages({
        'string.empty': 'Id is required'
    })
});

const validators = {
    login,
    register,
    status,
    review,
    report,
    addRecipe,
    recipe
}

export default validators;