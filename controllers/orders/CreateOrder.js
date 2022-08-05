import { cart_status } from '../../config/constants.js'
import {
  ErrorResponse,
  successResponseWithData,
  validationErrorWithData
} from '../../helper/apiResponse.js'
import { getErorr } from '../../helper/errorDetails.js'
import Cart from '../../models/CartModel.js'
import Order from '../../models/Order.js'

const CreateOrder = async (req, res) => {
  try {
    const { address, date } = req.body
    const cart = await new Cart().getCartByUser({ userId: req.user.id })
    
    if (!(cart && Array.isArray(cart) && cart.length > 0)) {
      return validationErrorWithData(res, getErorr('cart_not_found'), {
        error: getErorr('cart_not_found')
      })
    }
    await new Cart().changeStatus({
      status: cart_status.ORDERED,
      id: cart[0].id
    })
    const response = await new Order().insertOrder({
      address,
      date,
      cart_id: cart[0].id
    })

    return successResponseWithData(res, 'fetched', response)
  } catch (e) {
    return ErrorResponse(res, e.message)
  }
}
export default CreateOrder
