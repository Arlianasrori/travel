import userService from "../service/authService.js";
import { GoogleUrl } from "../config/googleOauth.js"

export const register = async (req,res,next) => {
    try {
        const user = req.body.user
        const alamat = req.body.alamat

        const result = await userService.register(user,alamat)
      
        res.status(201).json({
            msg : "succes,verify your account",
            data : result
        })
    } catch (error) {
        next(error)
    }
}
export const uploadProfile = async (req,res,next) => {
    try {
        const user = req.body.email
        const file = req.files.foto_profile
        const url = `http://${req.hostname}/public/images`

        const result = await userService.updateProfile(user,file,url)
        res.status(201).json({
            msg : "succes",
            data : result
        })
    } catch (error) {
        next(error)
    }
}
export const verifyOtp = async (req,res,next) => {
    try {
        const user = req.params.email
        const otp = req.body.otp

        const result = await userService.verifyOtp(user,otp)
        res.status(201).json({
            msg : "succes",
            data : result
        })
    } catch (error) {
        next(error)
    }
}
export const sendOtpUlang = async (req,res,next) => {
    try {
        const user = req.params.email

        const result = await userService.sendOtpUlang(user)
        res.status(201).json({
            msg : "succes",
            data : result
        })
    } catch (error) {
        next(error)
    }
}
export const login = async (req,res,next) => {
    try {
        const body = req.body
        const user = req.user
        const result = await userService.login(body,user)
        res.status(201).cookie({
            maxAge : 24 * 60 * 60 * 60,
            httpOnly: true,
            sameSite: 'None',
            // secure: true
        }).json({
            msg : "succes",
            data : result
        })
    } catch (error) {
        next(error)
    }
}
export const loginWithGoogle = async (req,res,next) => {
    try {     
        res.redirect(GoogleUrl)
    } catch (error) {
        next(error)
    }
}
export const loginWithGoogleCallback = async (req,res,next) => {
    try {
        const code = req.query.code
        const result = await userService.googleCallback(code)

        if(result.error) {
            return res.send("error guys")
        }

        res.status(200).cookie("acces_token",result.acces_token,{
            maxAge : 24 * 60 * 60 * 60,
            httpOnly: true,
        }).cookie("refresh_token",result.refresh_token,{
            maxAge : 24 * 60 * 60 * 60,
            httpOnly: true,
        }).json({
            msg : "succes",
            data : result
        })
    } catch (error) {
        next(error)
    }
}


