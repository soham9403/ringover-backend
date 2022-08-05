import {
  ErrorResponse,
  successResponseWithData
} from '../../helper/apiResponse.js'
import Color from '../../models/ColorModel.js'

const getColors = async (req, res) => {
  try {
    const response = await new Color().getColors()
    return successResponseWithData(res, 'fetched', response)
  } catch (e) {
    return ErrorResponse(res, e.message)
  }
}
export default getColors
