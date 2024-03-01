import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { errorMiddleware } from "../middleware/errorMiddleware.js"
import fileUpload from "express-fileupload"
import { userRouter } from "../routes/userRouter.js"

export const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    limits: { 
    fileSize: 50 * 1024 * 1024, 
   },
}))
app.use('/user',userRouter)