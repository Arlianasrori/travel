import express from "express"
import { userLoginVerifyMiddleware } from "../middleware/userVerifyMiddleware.js"
import { refreshTokenMIddleware } from "../middleware/refreshTokenMiddleware.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { logOut, login, loginWithGoogle, loginWithGoogleCallback, refreshToken, register, sendOtpUlang, uploadProfile, verifyOtp } from "../controller/authController.js"



export const authRouter = express.Router()

authRouter.post('/register',register)
authRouter.put('/foto_Profile',uploadProfile)
authRouter.post("/verifyOtp/:email",verifyOtp)
authRouter.post("/sendOtpUlang/:email",sendOtpUlang)
authRouter.post("/login",userLoginVerifyMiddleware,login)
authRouter.get("/login/google",loginWithGoogle)
authRouter.get("/auth/google/callback",loginWithGoogleCallback)
authRouter.post("/logout",authMiddleware,logOut)
authRouter.post("/refreshToken",refreshTokenMIddleware,refreshToken)
