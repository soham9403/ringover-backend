import * as apiResponse from '../helper/apiResponse.js'
import jwt from 'jsonwebtoken'

import User from '../models/userModel.js'
import { getErorr } from '../helper/errorDetails.js'
const jwtVerifier = async (req, res, next) => {
  let jwtSecretKey = process.env.JSON_WEB_TOKEN_SECRET_KEY

  try {
    const Bearer = req.header('Authorization')
    const token = Bearer.replace('Bearer ', '')

    const verified = jwt.verify(token, jwtSecretKey, { complete: true })
    if (verified) {
      // const user = await UserModel.findOne({
      //   _id: mongoose.Types.ObjectId(verified.payload.data._id)
      // })
      const userResponse = await new User().getUserByEmail({
        email: verified.payload.data.email,
        all: true
      })
     

      if (!userResponse || !Array.isArray(userResponse) || userResponse.length <= 0) {
        return apiResponse.forbiddenResponse(res,getErorr('token_tempered'))
      }
      const user = userResponse[0]

      req.user = user
      next()
    } else {
      // Access Denied
      return apiResponse.unauthorizedResponse(res, getErorr('token_required'))
    }
    // return apiResponse.unauthorizedResponse(res,error);
  } catch (error) {
    // Access Denied
    return apiResponse.unauthorizedResponse(res, error)
  }
}
export default jwtVerifier
