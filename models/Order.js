import { cart_status, tables } from '../config/constants.js'
import connection from '../config/dbconnection.js'
import { getInsertQuery } from '../helper/helperFunction.js'

class Order {
  constructor () {
    this.table = tables.order
  }
  async insertOrder (data) {
    const query = getInsertQuery(this.table, data)

    const response = connection().query(query)
    await connection().close()
    return response
  }
  async fetchOrders ({ id }) {
    const OrderTable = this.table

    const cartTable = tables.cart

    const productTable = tables.product
    const userTable = tables.user
    const cartProductTable = tables.cart_product

    const query = `SELECT ${OrderTable}.id as order_id,${OrderTable}.address,${OrderTable}.date,${productTable}.*,${userTable}.name as customer_name FROM ${OrderTable} 
    LEFT JOIN  ${cartTable} ON ${cartTable}.id =${OrderTable}.cart_id 
    LEFT JOIN   ${userTable} ON ${userTable}.id= ${cartTable}.user_id 
    LEFT JOIN ${cartProductTable} ON ${cartProductTable}.cart_id =${cartTable}.id 
    LEFT JOIN ${productTable} ON ${productTable}.id=${cartProductTable}.product_id 
    WHERE ${productTable}.creator_id=?    
    AND ${cartTable}.status='${cart_status.ORDERED}' 
    ORDER BY ${OrderTable}.id DESC`

    const response = await connection().query(query, [id])

    await connection().close()
    return response
  }
}
export default Order
