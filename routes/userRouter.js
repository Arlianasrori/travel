import express from "express"
import { register, sendOtpUlang, uploadProfile, verifyOtp } from "../controller/userController.js"

export const userRouter = express.Router()

userRouter.post('/register',register)
userRouter.put('/foto_Profile',uploadProfile)
userRouter.post("/verifyOtp/:email",verifyOtp)
userRouter.post("/sendOtpUlang/:email",sendOtpUlang)

