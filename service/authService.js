import { validate } from "../validation/validation.js";
import { responseError } from "../error/responseError.js";
import jwt from "jsonwebtoken"
import { prismaClient } from "../config/db.js";
import { alamatValidation, loginValidation, registerValidation } from "../validation/authValidation.js";
import path from "path"
import fs from "fs"
import bcrypt from "bcrypt"
import serviceUtils from "../utils/serviceUtils.js";
import { sendOtpToUser } from "../utils/sendOtp.js"
import { redisClient } from "../redis/redisClient.js";
import { oauth2Client } from "../config/googleOauth.js";
import { google } from "googleapis";
import { file } from "../utils/imageSaveUtils.js";


const register = async (body,alamat) => {
    body = await validate(registerValidation,body)
    alamat = await validate(alamatValidation,alamat)

    const findUser = await prismaClient.users.findUnique({
        where : {
            email : body.email
        }
    })

    body.password = await bcrypt.hash(body.password,10)
    if(findUser) {
        if(!findUser.verify) {
            return  prismaClient.$transaction(async (tx) => {
                return serviceUtils.checkVerify(body,alamat,tx)
            })
        }else {
        throw new responseError(400,"user sudah terdaftar")
       }
    }
  
    return prismaClient.$transaction(async (tx) => {
        const usercreate = await tx.users.create({
            data : body,
            select : {
                email : true,
                name : true,
                no_hp : true,
                verify : true,
                isAdmin : true,
                foto_profile : true,                      
            }
        })
        alamat.email_user = usercreate.email
        const alamatCreate = await tx.alamat.create({
            data : alamat
        })
        sendOtpToUser(body.email)

        return {user : usercreate,alamat : alamatCreate}
    })
}
const updateProfile = async (user,image,url) => {
    const findUser = await prismaClient.users.findUnique({
        where : {
            email : user
        }
    })
    if(!findUser) {
        throw new responseError(404,"user not found")
    }

    const {pathSaveFile,fullPath} = await file(image,url)

    return image.mv(pathSaveFile,async (err) => {
        if(err) {
            throw new responseError(500,err.message)
        }
        const updateProfile = await prismaClient.users.update({
            where : {
                email : findUser.email
            },
            data : {
                foto_profile : fullPath
            },
            select : {
                email : true,
                name : true,
                foto_profile : true,                      
            }
        })
        const nameBeforeUpdate = findUser.foto_profile.split("/")[5]
        fs.unlink(`./public/images/${nameBeforeUpdate}`,(err) => {
            if(err) {
                console.log(err);
                return err
            }
        })
        return updateProfile
    })

}

const verifyOtp = async (user,otp) => {
    if(!otp){
        throw new responseError(400,"invalid otp")
    }
    const userOtp = await redisClient.get(user)
 
    const findUser = await prismaClient.users.findUnique({
        where : {
            email : user
        },
        select : {
            email : true,
            verify : true
        }
    })
    if(!findUser) {
        throw new responseError(404,"user not found")
    }else if(findUser.verify){
        throw new responseError(400,"user sudah verify")
    }else{
        if(otp != userOtp){
            throw new responseError(400,"otp invalid")
        }else{
            await prismaClient.users.update({
                where : {
                    email : user
                },
                data : {
                    verify : true
                }
            })
        }
    }

    return "succes"
}
const sendOtpUlang = async (user) => {
    const findUser = await prismaClient.users.findUnique({
        where : {
            email : user
        },
        select : {
            email : true,
            verify : true
        }
    })

    if(!findUser) {
        throw new responseError(404,"user not found")
    }
    if(findUser.verify){
        throw new responseError(400,"user already verified")
    }

    sendOtpToUser(user)
    return "succes"

}
const login = async (body,user) => {
    body = await validate(loginValidation,body)
    console.log(user);

    const isPassowrd = await bcrypt.compare(body.password,user.password)
    if(!isPassowrd) {
        throw new responseError(400,"email or password wrong")
    }

    const payload = {
        email : user.email,
        name : user.email
    }
    const acces_token = jwt.sign(payload,process.env.TOKEN_SECRET,{expiresIn : "2d"})
    const refresh_token = jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{expiresIn : "60d"})

    return {acces_token,refresh_token}
}

const googleCallback = async (code) => {
    const {tokens} = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)

    const oauth2 = google.oauth2({
        auth: oauth2Client,
        version : "v2"
    })

    const {data} = await oauth2.userinfo.get()
    const findUser = await prismaClient.users.findUnique({
        where : {
            email : data.email
        }
    })
    if(!findUser){
        return {error : true}
    }
    if(!findUser.verify){
        return {error : true}
    }

    const payload = {
        email : findUser.email,
        name : findUser.email
    }
    const acces_token = jwt.sign(payload,process.env.TOKEN_SECRET,{expiresIn : "2d"})
    const refresh_token = jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{expiresIn : "60d"})

    return {error : false,acces_token,refresh_token}
}
export default {
    register,
    updateProfile,
    verifyOtp,
    sendOtpUlang,
    login,
    googleCallback
}