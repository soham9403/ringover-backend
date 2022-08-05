import {
  ErrorResponse,
  successResponseWithData
} from '../../helper/apiResponse.js'
import Category from '../../models/CategoryModel.js'


const getCategories = async (req, res) => {
  try {
    let params = {}
    if (req.query.parent_id) {
      params['type'] = 'subcategory'
      params['parent_id'] = req.query.parent_id
    }

    if (req.query.all) {
      params['type'] = 'subcategory'
    }
    const response = await new Category().getCategoryList(params)
    return successResponseWithData(res, 'fetched', response)
  } catch (e) {
    return ErrorResponse(res, e.message)
  }
}
export default getCategories
