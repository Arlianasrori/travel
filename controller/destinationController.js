import destinationService from "../service/destinationService.js";

export const add = async (req,res,next) => {
    try {
        const body = {
            nama :  req.body.nama,
            deks : req.body.deks,
            price : parseInt(req.body.price),
            add_by : req.user.email
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
        const url = `http://${req.hostname}:2008/public/images`
        console.log(image);

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
        const id = parseInt(req.params.id)
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
        const id = parseInt(req.params.id)
        const image = req.files.thumbnail
        const url = `http://${req.hostname}:2008/public/images`

        const result = await destinationService.updateThumbnail(id,image,url)
        res.status(200).json({
            msg : "succes",
            data : result
        })
    } catch (error) {
        next(error)
    }
}

export const addFeaturecategories = async (req,res,next) => {
    const body = req.body
    const result = await destinationService.addFeatureCategories(body)
    res.status(200).json({
        msg : "succes",
        data : result
    })
}
export const addFeature = async (req,res,next) => {
    try {
        const body = req.body
        const result = await destinationService.addFeature(body)
        res.status(200).json({
            msg : "succes",
            data : result
        })
    } catch (error) {
        next(error)
    }
}
export const deleteFeature = async (req,res,next) => {
    try {
        const id = parseInt(req.params.id)
        const result = await destinationService.deleteFeature(id)
        res.status(200).json({
            msg : "succes",
            data : result
        })
    } catch (error) {
        next(error)
    }
}
export const updateFeature = async (req,res,next) => {
    try {
        const id = parseInt(req.params.id)
        const feature_id = req.body.feature_id
        const result = await destinationService.updateFeature(id,feature_id)
        res.status(200).json({
            msg : "succes",
            data : result
        })
    } catch (error) {
        next(error)
    }
}
export const updateCategories = async (req,res,next) => {
    try {
        const id = parseInt(req.params.id)
        const body = req.bod.feature_id
        const result = await destinationService.updateFeature(id,body)
        res.status(200).json({
            msg : "succes",
            data : result
        })
    } catch (error) {
        next(error)
    }
}
export const addGallery = async (req,res,next) => {
    try {
        const body = req.body
        const id = parseInt(req.params.id)
        const url = `http://${req.hostname}:2008/public/images`
        const result = await destinationService.addGallery(body,id,url)
        res.status(200).json({
            msg : "succes",
            data : result
        })
    } catch (error) {
        next(error)
    }
}