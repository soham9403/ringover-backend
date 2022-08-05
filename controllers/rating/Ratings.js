import multer from 'multer'
import {
  ErrorResponse,
  successResponseWithData
} from '../../helper/apiResponse.js'
import Product from '../../models/Product.js'
import Rating from '../../models/RatingModel.js'



const AddRating = async (req, res) => {
  try {
    const { product_id,value } = req.body

    
    
    const response = await new Rating().insertRating({
        product_id,
        user_id:req.user.id,
        value
    })
    return successResponseWithData(res, 'fetched',response)
    
  } catch (e) {
    return ErrorResponse(res, e.message)
  }
}
export default AddRating
