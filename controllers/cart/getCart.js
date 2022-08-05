import {
  ErrorResponse,
  successResponseWithData
} from '../../helper/apiResponse.js'
import Cart from '../../models/CartModel.js'


const getCart = async (req, res) => {
  try {
    let params = {}
    if (req.query.userId) {
      params['userId'] = req.query.userId
    }

    const response = await new Cart().fetchCarts({ id: req.user.id })

    return successResponseWithData(res, 'fetched', response)
  } catch (e) {
    return ErrorResponse(res, e.message)
  }
}
export default getCart
