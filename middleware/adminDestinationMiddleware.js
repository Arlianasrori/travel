import  Jwt  from "jsonwebtoken"
export const adminDestinationMiddleware = async (req,res,next) => {
    const token = req.cookies.acces_token

    if(!token){
        return res.status(401).json({msg : "unauthorized"})
    }
    const user = await Jwt.verify(token,process.env.TOKEN_SECRET,(err,user) => {
        if(err){
            return {
                status : 401,
                msg : err.message
            }
        }
        req.user = user
        return user
    })

    if(user.status == 401){
        return res.status(user.status).json({
            msg : user.msg
        })
    }

    if(!user.isAdmin) {
        return res.status(401).json({
            msg : "not admin is unauthorized"
        })
    }
    
     next()
}