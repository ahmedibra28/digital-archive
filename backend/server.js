import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import fileUpload from 'express-fileupload'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import departmentRoutes from './routes/departmentRoutes.js'
import documentRoutes from './routes/documentRoutes.js'

dotenv.config()

connectDB()

const app = express()
const __dirname = path.resolve()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(fileUpload())

app.use('/api/users', userRoutes)
app.use('/api/departments', departmentRoutes)
app.use('/api/documents', documentRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 1010

app.listen(
  PORT,
  console.log(
    `Server running ${process.env.NODE_ENV} mode on post ${PORT}`.yellow.bold
  )
)
