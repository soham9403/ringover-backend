

import { tables } from '../config/constants.js'
import connection from '../config/dbconnection.js'
import { getInsertQuery } from '../helper/helperFunction.js'

class CartProductModel {
  constructor () {
    this.table = tables.cart_product
  }
  async insertCartProduct (data) {
    const query = getInsertQuery(this.table, data)

    const response = connection().query(query)
    await connection().close()
    return response
  }
  async deleteCartItem({id}){
    const query = "DELETE FROM "+ this.table +  " WHERE id=?"

    const response = connection().query(query,[id])
    await connection().close()
    return response
  }
  
}
export default CartProductModel