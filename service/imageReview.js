import { prismaClient } from "../config/db.js";
import { responseError } from "../error/responseError.js";
import { imageReviewValidation } from "../validation/imageReviewValidation.js";
import { validate } from "../validation/validation.js";
import Randomstring from "randomstring";
import { file } from "../utils/imageSaveUtils.js";
import fs from "fs"

const upload = async (body, image,url) => {
  body.id = parseInt(
    Randomstring.generate({
      length: 7,
      charset: ["numeric"],
    })
  );
  body.destination_reviews_id = parseInt(body.destination_reviews_id)
  const reviewId = await prismaClient.destination_reviews.findUnique({
    where: {
      id: body.destination_reviews_id,
    },
  });

  if (!reviewId) {
    throw new responseError(401, "Destination not found");
  }

  if (!image) {
    throw new responseError(401, "image must be uploaded");
  }

  const {fullPath,pathSaveFile} = await file(image,url)
  body.image = fullPath
  body = await validate(imageReviewValidation, body);
  image.mv(pathSaveFile,(err) => {
    if(err) {
      throw new responseError(500,err.message)
    }
  })
  return prismaClient.destination_reviews_image.create({
    data: body,
    select: {
      image : true,
    },
  });
};

const deleteImage = async (id) => {
  const findImage = await prismaClient.destination_reviews_image.findUnique({
    where : {
      id : id
    }
  })

  if(!findImage) {
    throw new responseError(404,"destination review image mage is not found")
  }
  
  await prismaClient.destination_reviews_image.delete({
    where : {
      id : id
    }
  })
  const nameBeforeUpdate = findImage.image.split("/")[5]
  await fs.unlink(`./public/images/${nameBeforeUpdate}`,(err) => {
      if(err) {
          throw new responseError(500,err.message)
      }
  })
  return "succes"
}
export default {
  upload,
  deleteImage
};
