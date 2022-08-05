import Joi from 'joi'
import { getErorr } from '../helper/errorDetails.js'
import User from '../models/userModel.js'

const signUpApiScehma = Joi.object({
  name: Joi.string()
    .empty('')
    
    .max(80)
    .required()
    .messages({
      'any.required': getErorr('name_required'),
      'string.max': getErorr('name_is_long')
    }),

  password: Joi.string()
    .empty('')
    .required()
    .messages({
      'any.required': getErorr('password_required')
    }),
  address: Joi.string()
    .empty('')
    .required()
    .messages({
      'any.required': getErorr('address_required')
    }), //.message('address_required'),
  email: Joi.string()
    .empty('')
    .email()
    .required()
    .external( async(value, helpers) => {
      // return helpers.error('any.custom');
      try {
        

        const response = await new User().getUserByEmail({ email: value })
 
        if (response && Array.isArray(response) && response.length > 0) {
          
        
          throw new Error(getErorr('email_exist'))
          
        }
        
        return value
      } catch (e) {
        throw new Error(getErorr('email_exist'))
        
      }
      
    }, 'email existance check')
    .messages({
      'any.required': getErorr('email_required'),
      'string.email': getErorr('invalid_email'),
      'any.custom': getErorr('email_exist')
    }),
  mobile: Joi.string()
    .empty('')
    .required()
    .pattern(/^[0-9]+$/)
    .messages({
      'any.required': getErorr('mobile_no_required'),
      'string.pattern.base': getErorr('invalid_mobile')
    })
})

export default signUpApiScehma
