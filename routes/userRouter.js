import express from "express"
import { register, uploadProfile } from "../controller/userController.js"

export const userRouter = express.Router()

userRouter.post('/register',register)
userRouter.put('/foto_Profile',uploadProfile)

