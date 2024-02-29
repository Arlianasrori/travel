import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { errorMiddleware } from "../middleware/errorMiddleware.js"

export const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(cors())
app.use(errorMiddleware)