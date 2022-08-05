import {
  ErrorResponse,
  successResponseWithData,
  validationErrorWithData
} from '../../../helper/apiResponse.js'
import { tables, user_role } from '../../../config/constants.js'
import { getInsertQuery } from '../../../helper/helperFunction.js'
import { comparePass, encryptPass } from '../../../helper/passEncDec.js'
import User from '../../../models/userModel.js'
import { getErorr } from '../../../helper/errorDetails.js'
import genrateToken from '../jwt/genrateToken.js'

const SignInController = async (req, res) => {
  try {
    const { email, password } = req.body

    const userData = await new User().getUserByEmail({
      email: email,
      all: true
    })
    if (!userData || !Array.isArray(userData) || userData.length <= 0) {
      return validationErrorWithData(res,getErorr('validation_error'),{error:getErorr('user_not_found')})
    }

    if(!comparePass(password,userData[0]['password'])){
      return validationErrorWithData(res,getErorr('validation_error'),{error:getErorr('wrong_password')})
    }
    delete userData[0]['password']
    return successResponseWithData(res, 'signedup', {
      ...userData[0],
      ...genrateToken(userData[0])
    })
  } catch (e) {
    return ErrorResponse(res, e.message)
  }
}
export default SignInController
