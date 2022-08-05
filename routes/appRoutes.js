import express from 'express'
import createOrderApiSchema from '../apischemas/createOrderApiSchema.js'
import createProductApiSchema from '../apischemas/createProductApiSchema.js'
import custumizationApiSchema from '../apischemas/custumizationApiSchema.js'
import { user_role } from '../config/constants.js'
import CreateCart from '../controllers/cart/CreateCart.js'
import deleteCart from '../controllers/cart/deleteCart.js'
import getCart from '../controllers/cart/getCart.js'
import getCategories from '../controllers/category/getCategories.js'
import getColors from '../controllers/colors/getColors.js'
import CreateCustomize from '../controllers/customizes/CreateCustomize.js'
import getCustomizes from '../controllers/customizes/getCustomizes.js'
import CreateOrder from '../controllers/orders/CreateOrder.js'
import getOrder from '../controllers/orders/getOrder.js'
import CreateProduct from '../controllers/products/CreateProduct.js'
import getProductDetails from '../controllers/products/getProductDetails.js'
import getProducts from '../controllers/products/getProducts.js'
import getProductsAndFiltersBySlug from '../controllers/products/getProductsAndFiltersBySlug.js'
import AddRating from '../controllers/rating/Ratings.js'
import getUserInfo from '../controllers/user/getUserInfo.js'
import JOImiddleware from '../middlewear/JOImiddleware.js'

import jwtVerifier from '../middlewear/jwtverifiers.js'
import { roleAccess } from '../middlewear/roleAccess.js'
// import GetUserList from '../controllers/auth/GetUserList.js'

const appRoutes = express.Router()

appRoutes.get('/user', jwtVerifier, getUserInfo)
appRoutes.get('/color', getColors)
appRoutes.get('/categories', getCategories)
appRoutes.post(
  '/create-product',
  jwtVerifier,
  (req,res,next)=>{
    roleAccess(req,res,next,[user_role.MERCHENT_USER])
  },
  JOImiddleware(createProductApiSchema),
  CreateProduct
)


appRoutes.get(
  '/get-product',  
  getProducts
)
appRoutes.get(
  '/get-product-list',  
  getProductsAndFiltersBySlug
)
appRoutes.get(
  '/get-product-details',  
  getProductDetails
)
appRoutes.post(
  '/create-customize',
  jwtVerifier,
  (req,res,next)=>{
    roleAccess(req,res,next,[user_role.MERCHENT_USER])
  },
  JOImiddleware(custumizationApiSchema),
  CreateCustomize
)

appRoutes.post(
  '/rate',
  jwtVerifier,
  
  AddRating
)

appRoutes.post(
  '/cart',
  jwtVerifier,
  
  CreateCart
)

appRoutes.get(
  '/cart',
  jwtVerifier,
  
  getCart
)

appRoutes.post(
  '/order',
  jwtVerifier,
  JOImiddleware(createOrderApiSchema),
  CreateOrder
)

appRoutes.get(
  '/order',
  jwtVerifier,
  
  getOrder
)

appRoutes.delete(
  '/cart',
  jwtVerifier,
  
  deleteCart
)
appRoutes.get(
  '/get-customizes',  
  getCustomizes
)
export default appRoutes
