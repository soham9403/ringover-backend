import Joi from 'joi'
import { validationErrorWithData } from '../helper/apiResponse.js'
import { getErorr } from '../helper/errorDetails.js'
const JOImiddleware = (schema, property) => {
  return async (req, res, next) => {
    try {
      const response = await schema.validateAsync(req.body, {
        abortEarly: false
      })
      
      next()
    } catch (error) {
      const valid = error == null
      
      if (valid) {
        next()
      } else {
        const { details } = error
        let message = ''
        if (details) {
          message = details[0].message //details.map(i => i.message).join(',')
        }else{
          // this will parse retruning message like "xyz is required (xyz feild)" to "xyz is required"
          const erorrMessage = error.message.slice(0,error.message.indexOf(" ("))
          message = erorrMessage
        }
        
        return validationErrorWithData(res, getErorr('validation_error'), {
          error: message
        })
      }
    }
  }
}
export default JOImiddleware
