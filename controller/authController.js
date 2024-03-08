import userService from "../service/authService.js";
import { GoogleUrl } from "../config/googleOauth.js"
import jwt from "jsonwebtoken";

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
        const url = `http://${req.hostname}:2008/public/images`

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
        console.log(user);
        const result = await userService.login(body,user)
        res.status(201).cookie("acces_token",result.acces_token,{
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

export const logOut = async (req,res,next) => {
    try {
        const user = req.user
        console.log(user);
        if(!user) {
            return res.status(400).json({
                msg : "user sudah logout"
            })
        }
        res.status(200).clearCookie('acces_token').clearCookie('refresh_token')
        .json({
            msg : "logout succes",
            data :"ok"
        })
    } catch (error) {
        next(error)
    }
}
export const refreshToken = async (req,res,next) => {
    try {
        const user = req.user

        const acces_token = jwt.sign(user,process.env.TOKEN_SECRET)
        const refresh_token = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET)

        res.status(200).cookie("acces_token",acces_token,{
            maxAge : 24 * 60 * 60 * 60,
            httpOnly: true,
        }).cookie("refresh_token",refresh_token,{
            maxAge : 24 * 60 * 60 * 60,
            httpOnly: true,
        }).json({
            msg : "succes"
        })
    } catch (error) {
        next(error)
    }
}

