import Joi from 'joi'
import { getErorr } from '../helper/errorDetails.js'
import Customizes from '../models/CustomizationModel.js'
// import Customizes from '../models/CustumizationModel.js'

const custumizationApiSchema = Joi.object({
  name: Joi.string()
    .empty('')
    
    .max(80)
    .required()
    .messages({
      'any.required': getErorr('name_required'),
      'string.max': getErorr('name_is_long')
    }),

  parent_id: Joi.string()

    .external(async (value, helpers) => {
      try {
        if (value && value != '') {
          const response = await new Customizes().getCustomizesById({
            id: value
          })

          if (!(response && Array.isArray(response) && response.length > 0)) {
            throw new Error(getErorr('parent_customize_not_found'))
          }
        }
        return value
      } catch (e) {
        throw new Error(getErorr('parent_customize_not_found'))
      }
    }, 'user existance check')
    .messages({
      'any.required': getErorr('parent_id_required')
    }),
  product_id: Joi.string(),
  image: Joi.any()
    .meta({ swaggerType: 'file' })
    .optional()
    .description('Image File')
    .messages({
      'any.required': getErorr('image_required')
    })
})

export default custumizationApiSchema
