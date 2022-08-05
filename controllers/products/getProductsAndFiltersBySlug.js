import db from '../../config/dbconnection.js'
import {
  ErrorResponse,
  notFoundResponse,
  successResponseWithData
} from '../../helper/apiResponse.js'
import { getErorr } from '../../helper/errorDetails.js'
import Category from '../../models/CategoryModel.js'
import Color from '../../models/ColorModel.js'
import Product from '../../models/Product.js'

const getProductsAndFiltersBySlug = async (req, res) => {
  try {
    let params = {}

    

    const slug = req.query.slug
    if (req.query.search) {
      params['search'] = req.query.search
    }
    if (req.query.order_by) {
      params['order_by'] = req.query.order_by
    }
    const category = await new Category().getBySlug({ slug })
    if (!(category && Array.isArray(category) && category.length > 0)) {
      return notFoundResponse(res, getErorr('page_not_found'))
    }

    params['parent_category'] = category[0].id

    if (req.query.sub_category) {
      params['sub_category'] = JSON.parse(req.query.sub_category).join(',')
    }
    if (req.query.colors) {
      params['colors'] = JSON.parse(req.query.colors).join(',')
    }

    if (req.query.start_price && req.query.start_price != '') {
      params['start_price'] = req.query.start_price
    }
    if (req.query.end_price && req.query.end_price != '') {
      params['end_price'] = req.query.end_price
    }

    if (req.query.only_products) {
      const products = await new Product().getProducts(params)
      return successResponseWithData(res, 'fetched', {
        products:products,
        category:category[0]
      })
    }
    const response = await Promise.all([
      new Color().getColors(),
      new Category().getCategoryList({
        type: 'subcategory',
        parent_id: category[0].id
      }),
      new Product().getProducts(params)
    ])
    const colors = response[0]
    const subCategories = response[1]
    const products = response[2]
    
    return successResponseWithData(res, 'fetched', {
      colors,
      subCategories,
      products,
      category:category[0]
    })
  } catch (e) {
    return ErrorResponse(res, e.message)
  }
}
export default getProductsAndFiltersBySlug
