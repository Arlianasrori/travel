import { prismaClient } from "../config/db.js";
import { responseError } from "../error/responseError.js";
import { addDestinationAlamatValidation, addDestinationGalleryValidation, addDestinationValidation, addFeatureCategoriesDestinationValidation, addFeatureDestinationValidation, deleteDestinationGalleryValidation, deleteDestinationValidation, updateDestinationValidation } from "../validation/destinationValidation.js";
import { validate } from "../validation/validation.js";
import Randomstring from "randomstring";
import { file } from "../utils/imageSaveUtils.js";
import fs from "fs"

const add = async (body,alamat,image,url) => {
    const {pathSaveFile,fullPath} = await file(image,url)

    body.id = Randomstring.generate({
        length: 7,
        charset: ['numeric']
      });
    
    body.thumbnail = fullPath
    alamat.destination_id = body.id
    
    body = await validate(addDestinationValidation,body)

    alamat = await validate(addDestinationAlamatValidation,alamat)

    return image.mv(pathSaveFile,async (err) => {
        if(err) {
            console.log(err);
            throw new responseError(500,err.message)
            return 
        }
        return prismaClient.$transaction(async (tx) => {
            const addDestination = await tx.destinations.create({
                data : body
            })
            const addAlamat = await tx.alamat_destination.create({
                data : alamat
            })
    
            return {destination : addDestination,alamat : addAlamat}
        })
    })
}

const deleteDestination = async (id) => {
    id = await validate(deleteDestinationValidation,id)

    const findDestination = await prismaClient.destinations.findUnique({
        where : {
            id : id
        }
    })
    if(!findDestination) {
        throw new responseError(404,"destination is not found")
    }
    
    const deleteTransaction = await prismaClient.$transaction(async (tx) => {           
        const alamatDestinationDelete = await tx.alamat_destination.delete({
            where : {
                destination_id : id
            }
        })
        const destinationDelete = await tx.destinations.delete({
            where : {
                id : id
            }
        })
        return{destination : destinationDelete,alamat:alamatDestinationDelete}
    })
    const thumbnailName = findDestination.thumbnail.split("/")[5]
    fs.unlink(`./public/images/${thumbnailName}`,(err) => {
        if(err) {
            console.log(err);
            throw new responseError(500,err.message)
        }
    })
    return deleteTransaction
}

const update = async (body) => {
    body = await validate(updateDestinationValidation,body)

    const findDestination = await prismaClient.destinations.findUnique({
        where : {
            id : body.id
        }
    })

    if(!findDestination) {
        throw new responseError(404,"destination is not found")
    }
    return prismaClient.destinations.update({
        where : {
            id : body.id
        },
        data : body
    })
}

const updateThumbnail = async (id,image,url) => {
    const findDestination = await prismaClient.destinations.findUnique({
        where : {
            id : id
        }
    })
    if(!findDestination) {
        throw new responseError(404,"destination not found")
    }

    const {pathSaveFile,fullPath} = await file(image,url)
        await image.mv(pathSaveFile,async (err) => {
            if(err) {
                throw new responseError(500,err.message)
            }
        })
        const updateDestination = await prismaClient.destinations.update({
            where : {
                id : id
            },
            data : {
                thumbnail : fullPath
            }
        })
   
        const nameBeforeUpdate = findDestination.thumbnail.split("/")[5]
        fs.unlink(`./public/images/${nameBeforeUpdate}`,(err) => {
            if(err) {
                throw new responseError(500,err.message)
            }
        })    
        return updateDestination
}

const addFeatureCategories = async (body) => {
    body = await validate(addFeatureCategoriesDestinationValidation,body)
    const findCategories = await prismaClient.feature.count({
        where : {
            nama : body.nama
        }
    })
    if(findCategories) {
        throw new responseError(400,"categories telah tambahkan")
    }
    return prismaClient.feature.create({
        data : body
    })
}

const addFeature = async (body) => {
    body = await validate(addFeatureDestinationValidation,body)

    const findDestination = await prismaClient.destinations.findUnique({
        where : {
            id : body.destination_id
        }
    })

    if(!findDestination) {
        throw new responseError(404,"destination not found")
    }

    const findFeature = await prismaClient.feature.findUnique({
        where : {
            id : body.feature_id
        }
    })

    if(!findFeature) {
        throw new responseError(404,"feature not found")
    }
    return prismaClient.destination_feature.create({
        data : body
    })    
}
const deleteFeature = async (id) => {
    const findFeature = await prismaClient.destination_feature.findUnique({
        where : {
            id : id
        }
    })
    if(!findFeature) {
        throw new responseError(404,"feature is not found")
    }
    return prismaClient.destination_feature.delete({
        where : {
            id : id
        }
    })
}
const updateFeature = async (id,body) => {
    const findFeature = await prismaClient.destination_feature.findUnique({
        where : {
            id : id
        }
    })
    if(!findFeature) {
        throw new responseError(404,"feature is not found")
    }
    return prismaClient.destination_feature.update({
        where : {
            id : id
        },
        data : {
            feature_id : body
        }
    })
}
const updateFeatureCategories = async (id,body) => {
    body = await validate(addFeatureCategoriesDestinationValidation,body)
    const findFeatureCategories = await prismaClient.feature.findUnique({
        where : {
            id : id
        }
    })
    if(!findFeatureCategories) {
        throw new responseError(404,"feature Categories is not found")
    }
    return prismaClient.destination_feature.update({
        where : {
            id : id
        },
        data : body
    })
}
const deleteFeatureCategories = async (id) => {
    id = await validate(deleteDestinationGalleryValidation,id)
    const findFeatureCategories = await prismaClient.feature.findUnique({
        where : {
            id : id
        }
    })
    if(!findFeatureCategories) {
        throw new responseError(404,"feature Categories is not found")
    }
    return prismaClient.destination_feature.delete({
        where : {
            id : id
        }
    })
}
const addGallery = async (body,id,url) => {
    const findDestination = await prismaClient.destinations.findUnique({
        where : {
            id : id
        }
    })

    if(!findDestination) {
        throw new responseError(404,"destination is not found")
    }
    const datas = []
    for(let i = 0;i <= body.length - 1;i++) {
        const {pathSaveFile,fullPath} = await file(body[i],url)
        let dataBase64 = body[i].data.replace(/^data:image\/\w+;base64,/, "")
        let buffer = Buffer.from(dataBase64, 'base64');
     
        fs.writeFileSync(pathSaveFile,buffer,(err) => {
            if(err) {
                throw new responseError(500,err.message)
                return
            }
        })
        
        const payload = {
            destination_id : id,
            image : fullPath
        }

        const data = await validate(addDestinationGalleryValidation,payload)
        datas.push(data)
    }

    return prismaClient.destination_gallery.createMany({
        data : datas
    })
}
const deleteGallery = async (id) => {
    id = await validate(deleteDestinationGalleryValidation,id)
    const findGallery = await prismaClient.destination_gallery.findUnique({
        where : {
            id : id
        }
    })
    
    if(!findGallery) {
        throw new responseError(404,"destination galerry is not found")
    }
    return prismaClient.destination_gallery.delete({
        where : {
            id : id
        }
    })
}
export default {
    add,
    deleteDestination,
    update,
    updateThumbnail,
    addFeatureCategories,
    addFeature,
    addGallery,
    deleteFeature,
    updateFeature,
    updateFeatureCategories,
    deleteGallery,
    deleteFeatureCategories
}