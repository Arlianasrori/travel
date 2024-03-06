import { prismaClient } from "../config/db.js";
import { responseError } from "../error/responseError.js";
import { addDestinationAlamatValidation, addDestinationValidation } from "../validation/destinationValidation.js";
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
    
    return prismaClient.$transaction(async (tx) => {
        const addDestination = await tx.destinations.create({
            data : body
        })
        const addAlamat = await tx.alamat_destination.create({
            data : alamat
        })
        image.mv(pathSaveFile,(err) => {
            if(err) {
                console.log(err);
                throw new responseError(500,err.message)
            }
        })

        return {destination : addDestination,alamat : addAlamat}
    })

}

export default {
    add
}