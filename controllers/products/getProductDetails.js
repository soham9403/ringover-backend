import {
  ErrorResponse,
  notFoundResponse,
  successResponseWithData
} from '../../helper/apiResponse.js'
import Customizes from '../../models/CustomizationModel.js'
import Product from '../../models/Product.js'

const getProductDetails = async (req, res) => {
  try {
    const slug = req.query.slug

    const product = await new Product().getBySlug({
      slug,
      allInformation: true
    })

    if (!(product && Array.isArray(product) && product.length > 0)) {
      return notFoundResponse(res, 'not_found')
    }

    const response = await Promise.all([
      new Product().getSimmillerProducts({
        category_id: product[0].category_id,
        current_id: product[0].id
      }),
      new Customizes().getCustomizesByProduct({ id: product[0].id})
    ])
    
    const similler = response[0]
    const customizations = response[1]
    return successResponseWithData(res, 'fetched', {
      product: product[0],
      customizations,
      similler
    })
  } catch (e) {
    
    return ErrorResponse(res, e.message)
  }
}
export default getProductDetails
