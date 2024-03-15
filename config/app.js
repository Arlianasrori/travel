import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { errorMiddleware } from "../middleware/errorMiddleware.js"
import { authRouter } from "../routes/authRouter.js"
import env from "dotenv"
import { userRouter } from "../routes/userRouter.js"
import { destinationRouter } from "../routes/destinationRouter.js"
import { favoritDestination } from "../routes/favoritDestinationRoute.js"
import { myDestination } from "../routes/myDestinationRoute.js"
import { reviewRouter } from "../routes/reviewRoute.js"
import { imageRoute } from "../routes/reviewImageRoute.js"
import fileUpload from "express-fileupload"

export const app = express()

env.config()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
app.use(cookieParser())
app.use(cors())
app.use(fileUpload())
app.use(express.static('public'))
app.use('/user',authRouter)
app.use('/user',userRouter)
app.use('/destination',destinationRouter)
app.use('/destination/destinationFavorite',favoritDestination)
app.use('/destination/myDestination',myDestination)
app.use('/destination/review', reviewRouter)
app.use('/destination/review/imageReview', imageRoute)

app.use(errorMiddleware)