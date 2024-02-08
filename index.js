import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import bodyParser from 'body-parser';
dotenv.config()
import cors from 'cors'
import authRouter from './routes/auth.route.js'

const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())



app.use('/api/auth', authRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500 
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
})

mongoose.connect(process.env.MONGO)
.then(() => {
    console.log("connected to mongodb") 
})
.catch((err) => {
    console.log(" mongo error")
})

app.listen(3000, () => {
    console.log("server is running on port 3000")
})
