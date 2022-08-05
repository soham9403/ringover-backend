import { cart_status } from '../../config/constants.js'
import {
  ErrorResponse,
  successResponseWithData
} from '../../helper/apiResponse.js'
import Cart from '../../models/CartModel.js'
import CartProductModel from '../../models/CartProductModel.js'

const CreateCart = async (req, res) => {
  try {
    const cart = await new Cart().getCartByUser({ userId: req.user.id })
    let cart_id
    if (!(cart && Array.isArray(cart) && cart.length > 0)) {
      const createdCart = await new Cart().insertCart({
        user_id: req.user.id,
        status: cart_status.IN_CART
      })
      cart_id = createdCart.insertId
    } else {
      cart_id = cart[0].id
    }
    const { product_id, customization_ids } = req.body
   const response = await new CartProductModel().insertCartProduct({
      cart_id,
      product_id,
      customization_ids
    })

    return successResponseWithData(res, 'fetched', response)
  } catch (e) {
    return ErrorResponse(res, e.message)
  }
}
export default CreateCart
