import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import url from 'url'

// Routes
import {router as auth_router} from './routes/auth.js'
import {router as home_router} from './routes/private/home.js'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({
    path: path.resolve(__dirname, './.env')
})

const app = express()
const port = process.env.PORT || 8080

mongoose.connect(process.env.DB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
    return console.log('DB Connected')
})

app.use(cors())
app.use(express.json())

app.use('/api/user', auth_router)
app.use('/api/page', home_router)

app.listen(port, () => console.log('Server is running'))