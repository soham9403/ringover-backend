import {
  ErrorResponse,
  successResponseWithData
} from '../../helper/apiResponse.js'

import Product from '../../models/Product.js'

const getProducts = async (req, res) => {
  try {
    let params = {}
    if (req.query.userId) {
      params['userId'] = req.query.userId
    }

    const response = await new Product().getProducts(params)
    return successResponseWithData(res, 'fetched', response)
  } catch (e) {
    return ErrorResponse(res, e.message)
  }
}
export default getProducts
