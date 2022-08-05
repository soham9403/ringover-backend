import multer from 'multer'
import {
  ErrorResponse,
  successResponseWithData
} from '../../helper/apiResponse.js'
import Product from '../../models/Product.js'



const CreateProduct = async (req, res) => {
  try {
    const { name, price, creator_id, color_id, category_id, slug } = req.body

    
    
    const image = req.file && req.file.path
    ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
    : ''
    const response = await new Product().insertProduct({
      name,
      price,
      creator_id,
      color_id,
      category_id,
      slug,
      image
    })
    return successResponseWithData(res, 'fetched',response)
    
  } catch (e) {
    return ErrorResponse(res, e.message)
  }
}
export default CreateProduct
