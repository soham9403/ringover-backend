import { tables } from '../config/constants.js'
import connection from '../config/dbconnection.js'
import { getInsertQuery } from '../helper/helperFunction.js'

class Product {
  constructor () {
    this.table = tables.product
  }
  async insertProduct (data) {
    const query = getInsertQuery(this.table, data)

    const respsonse = await connection().query(query)
    await connection().close()
    return respsonse
  }
  async getProducts ({
    userId,
    sub_category,
    parent_category,
    colors,
    search,
    order_by,
    start_price,
    end_price
  }) {
    const args = []
    const produtTable = this.table
    const ratingTable = tables.ratings
    const categoryTable = tables.category

    let query = `SELECT ${produtTable}.name,${produtTable}.slug,${produtTable}.id,${produtTable}.image,${produtTable}.price,AVG(${ratingTable}.value) AS rating `
    if (search) {
      query += `,${categoryTable}.name AS category_name `
    }
    query += `FROM  ${produtTable}`
    query += ` LEFT JOIN ${ratingTable} ON ${ratingTable}.product_id=${produtTable}.id `

    if (search || parent_category) {
      query += ` LEFT JOIN ${categoryTable} ON ${categoryTable}.id=${produtTable}.category_id `
    }

    if (start_price && end_price) {
      query += ` WHERE  ${produtTable}.price BETWEEN  ? AND ? `

      args.push(start_price)
      args.push(end_price)
    }
    if (end_price && !start_price) {
      query += ` WHERE  ${produtTable}.price <= ?  `
      args.push(end_price)
    }
    if (!end_price && start_price) {
      query += ` WHERE  ${produtTable}.price >= ?  `
      args.push(start_price)
    }
    if (!end_price && !start_price) {
      query += ` WHERE  1=1   `
    }

    if (search) {
      query += ` AND (${produtTable}.name LIKE '%' ? '%' OR ${categoryTable}.name LIKE '%' ? '%' )`
      args.push(search)
      args.push(search)
    }

    if (userId) {
      query += ' AND creator_id=?'
      args.push(userId)
    }
    if (colors) {
      query += ` AND ${produtTable}.color_id IN ( ${colors} )`
      // args.push(colors)
    }
    if (parent_category && !sub_category) {
      query += ` AND ${categoryTable}.parent_category=? `
      args.push(parent_category)
    }
    if (sub_category) {
      query += ` AND ${produtTable}.category_id IN ( ${sub_category} ) `
      // args.push(sub_category)
    }

    query += ` GROUP BY ${produtTable}.id`

    if (order_by == 'price_desc') {
      query += ` ORDER BY ${produtTable}.price DESC `
    }
    if (order_by == 'price_asc') {
      query += ` ORDER BY ${produtTable}.price ASC `
    }
    if (order_by == '' || order_by == 'created_at_asc') {
      query += ` ORDER BY ${produtTable}.created_at ASC `
    }
    if (order_by == 'created_at_desc') {
      query += ` ORDER BY ${produtTable}.created_at DESC `
    }

    const response = await connection().query(query, args)
    
    await connection().close()
    return response
  }
  async getSimmillerProducts ({ current_id, category_id }) {
    const query =
      'SELECT * FROM ' + this.table + ' WHERE category_id=? AND id!=? LIMIT 3'
      
      const response = await connection().query(query, [ category_id,current_id])
    return response
  }
  async getBySlug ({ slug, allInformation }) {
    const produtTable = this.table
    const userTable = tables.user
    const ratingTable = tables.ratings

    let query = 'SELECT * FROM ' + this.table + ' WHERE slug=?'
    if (allInformation) {
      query = `SELECT ${produtTable}.*,${userTable}.name AS  creator,AVG(${ratingTable}.value) AS rating,COUNT(${ratingTable}.id) AS total_views `
      query += `FROM  ${produtTable}`
      query += ` LEFT JOIN ${ratingTable} ON ${ratingTable}.product_id=${produtTable}.id `
      query += ` LEFT JOIN ${userTable} ON ${userTable}.id=${produtTable}.creator_id `
      query += ` WHERE ${produtTable}.slug=?`
      query += ` GROUP BY ${ratingTable}.product_id`
    }

    const respsonse = await connection().query(query, [slug])
    await connection().close()
    return respsonse
  }
}
export default Product
