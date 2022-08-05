import express from 'express'
import signInApiScehma from '../apischemas/signInApiSchema.js'
import signUpApiScehma from '../apischemas/signUpApiScehma.js'
import resetTokenController from '../controllers/auth/jwt/resetTokenController.js'
import SignInController from '../controllers/auth/signin/signInController.js'
import SignUpController from '../controllers/auth/signup/signUpController.js'
import JOImiddleware from '../middlewear/JOImiddleware.js'

const authRouter = express.Router()
authRouter.post('/reset-token', resetTokenController)
authRouter.post('/sign-up', JOImiddleware(signUpApiScehma), SignUpController)
authRouter.post('/sign-in', JOImiddleware(signInApiScehma), SignInController)

export default authRouter
