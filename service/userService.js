import { validate } from "../validation/validation.js";
import { responseError } from "../error/responseError.js";
import jwt from "jsonwebtoken"
import { prismaClient } from "../config/db.js";
import { alamatValidation, registerValidation } from "../validation/userValidation.js";
import path from "path"
import fs from "fs"
import bcrypt from "bcrypt"
import serviceUtils from "../utils/serviceUtils.js";
import { sendOtpToUser } from "../utils/sendOtp.js"
import { redisClient } from "../redis/redisClient.js";


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

    const fileName = image.name
    const extFileRequired = [".jpg",".png",".jpeg"]
    const extFile = path.extname(fileName)
    if(!extFileRequired.includes(extFile)) {
        throw new responseError(400,`extensi file ${extFile} tidak didukung`)
    }
    const fullName = `${new Date().getTime()}-${fileName}`
    const fullPath = `${url}/${fullName}`
    const pathSaveFile = `./public/images/${fullName}`
    return image.mv(pathSaveFile,async (err) => {
        if(err) {
            throw new responseError(500,err.message)
        }
        return prismaClient.users.update({
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
    })

}

const verifyOtp = async (user,otp) => {
    if(!otp){
        throw new responseError(400,"invalid otp")
    }
    const userOtp = await redisClient.get(user)
    console.log(otp,userOtp);
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
            console.log("hay");
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
export default {
    register,
    updateProfile,
    verifyOtp,
    sendOtpUlang
}