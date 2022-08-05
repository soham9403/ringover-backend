import {
  ErrorResponse,
  successResponseWithData
} from '../../../helper/apiResponse.js'
import { tables, user_role } from '../../../config/constants.js'
import { getInsertQuery } from '../../../helper/helperFunction.js'
import { encryptPass } from '../../../helper/passEncDec.js'
import User from '../../../models/userModel.js'
import { getErorr } from '../../../helper/errorDetails.js'
import genrateToken from '../jwt/genrateToken.js'

const SignUpController = async (req, res) => {
  try {
    const { name, email, password, address, mobile } = req.body

    const encryptedPassword = encryptPass(password)

    const role = user_role.NORMAL_USER

    const UserModel = new User()
    
    const insertData = {
      name,
      email,
      password: encryptedPassword,
      role,
      address,
      mobile
    }
    const response = await UserModel.insertUser(insertData)
    
    const userData = {
      id: response.insertId,
      ...insertData,      
    }
    delete userData['password']
    return successResponseWithData(res, 'signedup', {...userData,...genrateToken(userData)})
  } catch (e) {
    return ErrorResponse(res, e.message)
  }
}
export default SignUpController
