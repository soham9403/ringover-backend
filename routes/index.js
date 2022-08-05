import express from 'express'
import authRouter from './authroute.js'
import appRoutes from './appRoutes.js'
const app = express()

app.use("/auth/", authRouter)
app.use("/app/", appRoutes)

export default app