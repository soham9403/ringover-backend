import {
  ErrorResponse,
  successResponseWithData
} from '../../helper/apiResponse.js'
import Customizes from '../../models/CustomizationModel.js'
import Product from '../../models/Product.js'
import path from 'path'
const CreateCustomize = async (req, res) => {
  try {
    const { name, product_id } = req.body
    let parent_id = 0
    if (req.body.parent_id) {
      parent_id = req.body.parent_id
    }

    const image =
      req.file && req.file.path
        ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
        : ''
    const response = await new Customizes().insertCustomizes({
      name,
      parent_id,
      product_id,
      image
    })
    return successResponseWithData(res, 'fetched', response)
  } catch (e) {
    return ErrorResponse(res, e.message)
  }
}
export default CreateCustomize
