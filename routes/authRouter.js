import express from "express"
import { register, sendOtpUlang, uploadProfile, verifyOtp } from "../controller/authController.js"

export const authRouter = express.Router()

authRouter.post('/register',register)
authRouter.put('/foto_Profile',uploadProfile)
authRouter.post("/verifyOtp/:email",verifyOtp)
authRouter.post("/sendOtpUlang/:email",sendOtpUlang)

