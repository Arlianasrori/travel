import { prismaClient } from "../config/db.js";
import { responseError } from "../error/responseError.js";
import { addDestinationAlamatValidation, addDestinationValidation, deleteDestinationValidation, updateDestinationValidation } from "../validation/destinationValidation.js";
import { validate } from "../validation/validation.js";
import Randomstring from "randomstring";
import { file } from "../utils/imageSaveUtils.js";

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
        const destinationDelete = await tx.destinations.delete({
            where : {
                id : id
            }
        })
        
        const alamatDestinationDelete = await tx.alamat_destination.delete({
            where : {
                destination_id : id
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
            email : id
        }
    })
    if(!findDestination) {
        throw new responseError(404,"destination not found")
    }

    const {pathSaveFile,fullPath} = await file(image,url)

    return image.mv(pathSaveFile,async (err) => {
        if(err) {
            throw new responseError(500,err.message)
        }
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
})}


export default {
    add,
    deleteDestination,
    update,
    updateThumbnail
}