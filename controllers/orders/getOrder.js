import {
  ErrorResponse,
  successResponseWithData
} from '../../helper/apiResponse.js'
import Cart from '../../models/CartModel.js'
import Order from '../../models/Order.js'


const getOrder = async (req, res) => {
  try {
   

    const response = await new Order().fetchOrders({ id: req.user.id })

    return successResponseWithData(res, 'fetched', response)
  } catch (e) {
    return ErrorResponse(res, e.message)
  }
}
export default getOrder
