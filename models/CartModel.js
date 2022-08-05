import { cart_status, tables } from '../config/constants.js'
import connection from '../config/dbconnection.js'
import { getInsertQuery } from '../helper/helperFunction.js'

class Cart {
  constructor () {
    this.table = tables.cart
  }
  async insertCart (data) {
    const query = getInsertQuery(this.table, data)

    const response = connection().query(query)
    await connection().close()
    return response
  }
  async fetchCarts ({ id }) {
    const cartTable = this.table
    const productTable = tables.product
    const userTable = tables.user
    const cartProductTable = tables.cart_product
    const query = `SELECT ${productTable}.*,${cartProductTable}.id as cart_product_id,${cartTable}.status,${cartTable}.id AS cart_id,${userTable}.name AS creator FROM  ${this.table}  INNER JOIN  ${cartProductTable} ON ${cartProductTable}.cart_id=${cartTable}.id LEFT JOIN ${productTable} ON ${productTable}.id=${cartProductTable}.product_id LEFT JOIN ${userTable} ON ${userTable}.id=${productTable}.creator_id WHERE ${cartTable}.user_id=? ORDER BY ${cartTable}.id DESC,${productTable}.id DESC`

    const response = await connection().query(query, [id])

    await connection().close()
    return response
  }
  async getCartByUser ({ userId }) {
    const query = `SELECT * FROM ${this.table} WHERE user_id=? AND status='${cart_status.IN_CART}' ORDER BY id`
    const response = connection().query(query, [userId])
    await connection().close()
    return response
  }
  async changeStatus ({ status, id }) {
    const query = 'UPDATE ' + this.table + ' SET status=? WHERE id=?'

    const response = await connection().query(query, [status, id])
    
    await connection().close()
    return response
  }
}
export default Cart
