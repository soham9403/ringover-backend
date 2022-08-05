import { tables } from '../config/constants.js'
import connection from '../config/dbconnection.js'
import { getInsertQuery } from '../helper/helperFunction.js'

class User {
  constructor () {
    this.table = tables.user
  }
  async insertUser (data) {
    const query = getInsertQuery(this.table, data)

    const response = connection().query(query)
    await connection().close()
    
    return response
  }
  async getUserByEmail ({ email, all }) {
    let query = 'SELECT  '
    if (all) {
      query += '* '
    } else {
      query += 'name,email,id '
    }
    query += 'FROM ' + this.table + ' WHERE email=?'  

    const response = connection().query(query, [email])
    await connection().close()
    
    return response
  }

  async getUserById ({ id }) {
    let query = 'SELECT  id,email '
    
    query += 'FROM ' + this.table + ' WHERE id=?'  

    const response = connection().query(query, [id])
    await connection().close()
    
    return response
  }
}
export default User
