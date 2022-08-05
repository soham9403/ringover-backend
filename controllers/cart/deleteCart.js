
import {
  ErrorResponse,
  successResponseWithData
} from '../../helper/apiResponse.js'

import CartProductModel from '../../models/CartProductModel.js'

const deleteCart = async (req, res) => {
  try {
    const { id } = req.body
    const response = await new CartProductModel().deleteCartItem({
      id
    })

    return successResponseWithData(res, 'fetched', response)
  } catch (e) {
    return ErrorResponse(res, e.message)
  }
}
export default deleteCart
