import mysql from 'mysql2'
import dotenv from 'dotenv'
import util from 'util'
dotenv.config()
const db = () => {
  const connection = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    queueLimit: 50
  })
  
  return {
    query (sql, args) {
      return util.promisify(connection.query).call(connection, sql, args)
    },
    close () {
      return util.promisify(connection.end).call(connection)
    }
  }
}

// connection.on('error',function (err) {
//   if (err) throw err
//   console.log('Connected!')
// })
export default db
