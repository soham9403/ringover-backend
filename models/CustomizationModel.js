import { tables } from '../config/constants.js'
import connection from '../config/dbconnection.js'
import { getInsertQuery } from '../helper/helperFunction.js'

class Customizes {
  constructor () {
    this.table = tables.custumization
  }
  async insertCustomizes (data) {
    const query = getInsertQuery(this.table, data)

    const response = connection().query(query)
    await connection().close()
    return response
  }
  async getCustomizes ({ userId, all }) {
    const customizeTable = this.table
    const productTable = tables.product
    

    let query = `SELECT c1.id,c1.product_id,c1.image,${productTable}.name as product_name,${productTable}.image as product_image, CONCAT((CASE WHEN c2.id IS NOT NULL THEN CONCAT(c2.name, ' > ') ELSE '' END), c1.name) name, c1.parent_id
    FROM ${customizeTable} as c1
    LEFT JOIN ${productTable} ON ${productTable}.id=c1.product_id 
    LEFT JOIN ${customizeTable} as c2 ON c1.parent_id = c2.id WHERE ${productTable}.creator_id=?`
    if (!all) {
      query += ' AND c1.parent_id=0'
    }

    const response = connection().query(query, [userId])
    await connection().close()
    return response
  }
  async getCustomizesByProduct ({ id }) {
    let query =
      `SELECT  c1.*,c2.name AS parent FROM ` +
      this.table +
      ' AS c1 ' +
      'LEFT JOIN ' +
      this.table +
      ' AS c2 ON c1.parent_id=c2.id WHERE c1.product_id=?'

    const response = connection().query(query, [id])
    await connection().close()
    return response
  }
  async getCustomizesById ({ id }) {
    let query = 'SELECT  id  '

    query += 'FROM ' + this.table + ' WHERE id=? AND parent_id=0'

    const response = connection().query(query, [id])
    await connection().close()
    return response
  }
}
export default Customizes
