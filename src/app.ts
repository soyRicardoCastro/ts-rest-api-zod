import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import fileUpload from 'express-fileupload'

import authRoutes from './routes/auth.routes'
import productRoutes from './routes/products.routes'
import userRoutes from './routes/user.routes'
import { createRoles } from './lib/roleSetup'

const app = express()
createRoles()

dotenv.config()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './uploads'
}))

app.use(authRoutes)
app.use(productRoutes)
app.use(userRoutes)
export default app