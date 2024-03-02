import userService from "../service/userService.js";

export const register = async (req,res,next) => {
    try {
        const user = req.body.user
        const alamat = req.body.alamat
        const foto_profile = req.files.foto_profile
        const image_url = `http://${req.host}:2008/images`

        const result = await userService.register(user,alamat,foto_profile,image_url)
        res.status(201).json({
            msg : "succes",
            data : result
        })
    } catch (error) {
        next(error)
    }
}