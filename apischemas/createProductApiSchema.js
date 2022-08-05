import Joi from 'joi'
import { getErorr } from '../helper/errorDetails.js'
import Category from '../models/CategoryModel.js'
import Color from '../models/ColorModel.js'
import Product from '../models/Product.js'
import User from '../models/userModel.js'

const createProductApiSchema = Joi.object({
  name: Joi.string()
    .empty('')
    
    .max(80)
    .required()
    .messages({
      'any.required': getErorr('name_required'),
      'string.max': getErorr('name_is_long')
    }),

  price: Joi.number()
    .required()
    .messages({
      'any.required': getErorr('price_required')
    }),

  creator_id: Joi.string()
    .empty('')
    .required()
    .external(async (value, helpers) => {
      try {
        const response = await new User().getUserById({ id: value })

        if (!(response && Array.isArray(response) && response.length > 0)) {
          throw new Error(getErorr('user_not_found'))
        }

        return value
      } catch (e) {
        throw new Error(getErorr('user_not_found'))
      }
    }, 'user existance check')
    .messages({
      'any.required': getErorr('creator_id_required')
    }),

  color_id: Joi.string()
    .empty('')
    .required()
    .external(async (value, helpers) => {
      try {
        const response = await new Color().getById({ id: value })

        if (!(response && Array.isArray(response) && response.length > 0)) {
          throw new Error(getErorr('color_not_found'))
        }

        return value
      } catch (e) {
        throw new Error(getErorr('color_not_found'))
      }
    }, 'color existance check')
    .messages({
      'any.required': getErorr('color_id_required')
    }),
  category_id: Joi.string()
    .empty('')
    .required()
    .external(async (value, helpers) => {
      try {
        const response = await new Category().getById({ id: value })

        if (!(response && Array.isArray(response) && response.length > 0)) {
          throw new Error(getErorr('category_not_found'))
        }

        return value
      } catch (e) {
        throw new Error(getErorr('category_not_found'))
      }
    }, 'category existance check')
    .messages({
      'any.required': getErorr('category_id_required')
    }),
    slug: Joi.string()
    .empty('')
    .required()
    .external(async (value, helpers) => {
      try {
        const response = await new Product().getBySlug({ slug: value })

        if ((response && Array.isArray(response) && response.length > 0)) {
          throw new Error(getErorr('slug_exists'))
        }

        return value
      } catch (e) {
        throw new Error(getErorr('slug_exists'))
      }
    }, 'category existance check')
    .messages({
      'any.required': getErorr('slug_required')
    }),
  image: Joi.any()
    .meta({ swaggerType: 'file' })
    .optional()
    .description('Image File')
    .messages({
      'any.required': getErorr('image_required')
    })
})

export default createProductApiSchema
