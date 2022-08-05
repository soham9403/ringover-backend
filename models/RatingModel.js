import { tables } from '../config/constants.js'
import connection from '../config/dbconnection.js'
import { getInsertQuery } from '../helper/helperFunction.js'

class Rating {
  constructor () {
    this.table = tables.ratings
  }
  async insertRating (data) {
    const query = getInsertQuery(this.table, data)

    const response = connection().query(query)
    await connection().close()
    
    return response
  }
}
export default Rating
