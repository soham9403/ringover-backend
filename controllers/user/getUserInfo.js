import { successResponseWithData } from '../../helper/apiResponse.js'

const getUserInfo = (req, res) => {
  const userData = req.user
  delete userData['password']
  return successResponseWithData(res, 'user_fetched', userData)
}
export default getUserInfo
