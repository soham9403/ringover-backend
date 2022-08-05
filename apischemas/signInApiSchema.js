import Joi from 'joi'
import { getErorr } from '../helper/errorDetails.js'


const signInApiScehma = Joi.object({
    email: Joi.string()
        .empty('')
        .email()
        .required()
        .messages({
            'any.required': getErorr('email_required'),
            'string.email': getErorr('invalid_email')
        }),

    password: Joi.string()
        .empty('')
        .required()
        .messages({
            'any.required': getErorr('password_required')
        }),


})

export default signInApiScehma
