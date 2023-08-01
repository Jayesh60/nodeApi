import express from "express"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoute from "./route/auth.js"
import userRoute from "./route/user.js"
import cors from "cors"


const app = express()
dotenv.config()

const connect= async () =>{
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('Connected To Database')
    }).catch((err)=>{
        console.log(err)
    })
}

// middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use('/api', authRoute)
app.use('/api', userRoute)


app.listen(process.env.PORT, ()=>{
    connect();
    console.log("connected to backend")
})