import { validate } from "../validation/validation.js";
import { responseError } from "../error/responseError.js";
import jwt from "jsonwebtoken"
import { prismaClient } from "../config/db.js";
import { alamatValidation, registerValidation } from "../validation/userValidation.js";
import path from "path"
import fs from "fs"

const register = async (body,alamat,image,image_url) => {
    body = await validate(registerValidation,body)
    alamat = await validate(alamatValidation,alamat)

    const findUser = await prismaClient.users.findUnique({
        where : {
            email : body.email
        }
    })

   
    
    const fileName = image.name
    const fullFileName = `${new Date().getTime()}-${fileName}`
    const profilePath = `${url}/${fullFileName}`
    const extFileRequired = ["jpg","png","jpeg"]
    const fullFilePath = `${path.dirname}/public/images/${fullFileName}`
    const extFile = path.extname(fileName)

    if(!extFile.includes(extFileRequired)) {
        throw new responseError(400,"foto profile must on jpg,png or jpeg")
    }

    if(findUser) {
        if(!findUser.verify) {
            return  prismaClient.$transaction(async (tx) => {
                await image.mv(fullFilePath)
                body.foto_profile = profilePath
                const userUpdate = await tx.users.update({
                    where : {
                        email : body.email
                    },
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
                const alamatUpdate = await tx.alamat.update({
                    where : {
                        email_user : userUpdate.email
                    },
                    data : alamat
                })
                const beforeprofileName = findUser.foto_profile.split('/')[4]
                await fs.unlink(`${path.dirname}/public/images/${beforeprofileName}`)

                return {user : userUpdate,alamat : alamatUpdate}
            })
        }
       else {
        throw new responseError(400,"email or password wrong")
       }
    }

    return prismaClient.$transaction(async (tx) => {
        const usercreate = await tx.users.create({
            data : body
        })

        const alamatCreate = await tx.alamat.create({
            data : alamat
        })

        return {user : usercreate,alamat : alamatCreate}
    })
}

export default {
    register
}