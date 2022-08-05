import {
  ErrorResponse,
  successResponseWithData
} from '../../helper/apiResponse.js'
import Customizes from '../../models/CustomizationModel.js'

const getCustomizes = async (req, res) => {
  try {
    let params = {}
    if (req.query.userId) {
      params['userId'] = req.query.userId
    }
    if(req.query.all){
      params['all'] = true
    }

    const response = await new Customizes().getCustomizes(params)
    return successResponseWithData(res, 'fetched', response)
  } catch (e) {
    return ErrorResponse(res, e.message)
  }
}
export default getCustomizes
