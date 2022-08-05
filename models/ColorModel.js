import { tables } from '../config/constants.js'
import connection from '../config/dbconnection.js'
import { getInsertQuery } from '../helper/helperFunction.js'

class Color {
  constructor () {
    this.table = tables.color
  }
  async getColors () {
    const query = 'SELECT * FROM ' + this.table
    const response =  await connection().query(query)
    await connection().close()
    return response
  }
  async getById({id}){
    const query = 'SELECT * FROM ' + this.table + ' WHERE id=?'
    const response = await connection().query(query,[id])
    await connection().close()
    return response
  }
}
export default Color
