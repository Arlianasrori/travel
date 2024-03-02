import express from "express"
import { userLoginVerifyMiddleware } from "../middleware/userVerifyMiddleware.js"
import { login, loginWithGoogle, loginWithGoogleCallback, register, sendOtpUlang, uploadProfile, verifyOtp } from "../controller/authController.js"



export const authRouter = express.Router()

authRouter.post('/register',register)
authRouter.put('/foto_Profile',uploadProfile)
authRouter.post("/verifyOtp/:email",verifyOtp)
authRouter.post("/sendOtpUlang/:email",sendOtpUlang)
authRouter.post("/login",userLoginVerifyMiddleware,login)
authRouter.get("/login/google",loginWithGoogle)
authRouter.get("/auth/google/callback",userLoginVerifyMiddleware,loginWithGoogleCallback)

