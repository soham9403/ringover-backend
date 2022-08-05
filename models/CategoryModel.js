import { tables } from '../config/constants.js'
import connection from '../config/dbconnection.js'

class Category {
  constructor () {
    this.table = tables.category
  }

  async getCategoryList ({ type = 'parent', parent_id = -1 }) {
    const args = []
    let query = 'SELECT * FROM ' + this.table + ' WHERE parent_category'
    if (type == 'parent') {
      query += '=0'
    } else if (parent_id == -1) {
      query += '!=0'
    } else {
      query += '=?'
      args[0] = parent_id
    }

    const response =  await connection().query(query, args)
    await connection().close()
    return response
  }
  async getById({id}){
    const query = 'SELECT * FROM ' + this.table + ' WHERE id=?'
    const response =  await connection().query(query,[id])
    await connection().close()
    return response
  }
  async getBySlug({slug}){
    const query = 'SELECT * FROM ' + this.table + ' WHERE slug=?'
    const response =  await connection().query(query,[slug])
    await connection().close()
    return response
  }
}
export default Category
