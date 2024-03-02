import userService from "../service/authService.js";;

export const register = async (req,res,next) => {
    try {
        const user = req.body.user
        const alamat = req.body.alamat
        console.log(user,alamat);

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

        const result = await userService.verifyOtp(user)
        res.status(201).json({
            msg : "succes",
            data : result
        })
    } catch (error) {
        next(error)
    }
}