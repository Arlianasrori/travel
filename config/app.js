import express from "express"
import cookieParser from "cookie-parser"
import { errorMiddleware } from "../middleware/errorMiddleware.js"
import fileUpload from "express-fileupload"
import { authRouter } from "../routes/authRouter.js"
import env from "dotenv"
import { userRouter } from "../routes/userRouter.js"
import { destinationRouter } from "../routes/destinationRouter.js"
import { favoritDestination } from "../routes/favoritDestinationRoute.js"
import { myDestination } from "../routes/myDestinationRoute.js"

export const app = express()

env.config()
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  })
app.use(express.json({limit : "20mb"}))
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static('public'))
app.use(fileUpload({
    limits: { 
    fileSize: 50 * 1024 * 1024, 
   },
}))
app.use('/user',authRouter)
app.use('/user',userRouter)
app.use('/destination',destinationRouter)
app.use('/destination/destinationFavorite',favoritDestination)
app.use('/destination/myDestination',myDestination)
app.use(errorMiddleware)