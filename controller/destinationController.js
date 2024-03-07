import destinationService from "../service/destinationService.js";

export const add = async (req,res,next) => {
    try {
        const body = {
            nama :  req.body.nama,
            deks : req.body.deks,
            price : parseInt(req.body.price),
            add_by : req.body.add_by
        }
        const alamat = {
            village : req.body.village,
            subdistrick : req.body.subdistrick,
            regency : req.body.regency,
            province : req.body.province,
            country : req.body.country,
            detail_format : req.body.detail_format,
            latitude : parseInt(req.body.latitude),
            longtitude : parseInt(req.body.longtitude) 
        }
        const image = req.files.thumbnail
        const url = `http://${req.hostname}/public/images`
        console.log("p");

        const result = await destinationService.add(body,alamat,image,url)
        res.status(201).json({
            msg : "succes",
            data : result
        })
    } catch (error) {
        next(error)
    }
}

export const deleteDestination = async (req,res,next) => {
    try {
        const id = req.params.id
        const result = await destinationService.deleteDestination(id)
        res.status(200).json({
            msg : "succes",
            data : result
        })
    } catch (error) {
        next(error)
    }
}
export const updateDestination = async (req,res,next) => {
    try {
        const id = req.params.id
        const body = req.body
        body.id = id
        const result = await destinationService.update(body)
        res.status(200).json({
            msg : "succes",
            data : result
        })
    } catch (error) {
        next(error)
    }
}
export const updateThumbnail = async (req,res,next) => {
    try {
        const id = req.params.id
        const image = req.files.thumbnail
        const url = `http://${req.hostname}/public/images`

        const result = await destinationService.updateThumbnail(id,image,url)
        res.status(200).json({
            msg : "succes",
            data : result
        })
    } catch (error) {
        next(error)
    }
}