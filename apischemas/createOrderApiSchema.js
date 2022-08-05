import Joi from 'joi'
import { getErorr } from '../helper/errorDetails.js'

const createOrderApiSchema = Joi.object({
  address: Joi.string()
    .empty('')

    .required()
    .messages({
      'any.required': getErorr('address_required')
    }),
  date: Joi.string()
    .empty('')

    .required()
    .messages({
      'any.required': getErorr('date_required')
    }),
  
})

export default createOrderApiSchema
