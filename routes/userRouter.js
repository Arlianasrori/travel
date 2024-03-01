import express from "express"
import { errorMiddleware } from "../middleware/errorMiddleware.js"
import { register } from "../controller/userController.js"

export const userRouter = express.Router()

userRouter.post('/register',register,(req,res) => {
    console.log("error bgst");
})
