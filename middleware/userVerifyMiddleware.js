import { prismaClient } from "../config/db.js"

export const userLoginVerifyMiddleware = async (req,res,next) => {
    const email = req.body.email

    const findUser = await prismaClient.users.findUnique({
        where : {
            email : email
        }
    })
    if(!findUser) {
        return res.status(400).json({
            msg : "email or password wrong"
        })
    }
    if(!findUser.verify) {
        return res.status(401).json({
            msg : "user belum verify"
        })
    }
    
    req.user = {email : findUser.email,no_hp: findUser.no_hp,password: findUser.password,name : findUser.name}
    next()
}