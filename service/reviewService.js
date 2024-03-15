import { prismaClient } from "../config/db.js";
import { responseError } from "../error/responseError.js";
import Randomstring from "randomstring";
import { validate } from "../validation/validation.js";
import {
  destinationReviewValidation,
  updateDestinationReviewValidation,
} from "../validation/reviewValidation.js";

const destinationReview = async (body) => {
  body = await validate(destinationReviewValidation, body);


  body.id = parseInt(
    Randomstring.generate({
      length: 7,
      charset: ["numeric"],
    })
  );

  const destinationId = await prismaClient.destinations.findUnique({
    where: {
      id: parseInt(body.destination_id),
    },
  });

  if (!destinationId) {
    throw new responseError(404, "Destination is not found");
  }

  const reviewBy = await prismaClient.users.findUnique ({
    where: {
      email : body.review_by
    }
  })

  if (!reviewBy) {
    throw new responseError(401, "Anda harus login terlebih dahulu")
  }
  console.log(body);

  const addReview = await prismaClient.destination_reviews.findUnique({
    where: {
      id: body.id,
    },
  });

  if (addReview) {
    throw new responseError(401, "Review already added");
  } else {
    return prismaClient.destination_reviews.create({
      data: body,
      select: {
        comment: true,
        review_by: true,
        ratings: true,
      },
    });
  }
  
};

const update = async (body) => {
  body = await validate(updateDestinationReviewValidation, body);

  const existingReview = await prismaClient.destination_reviews.findUnique({
    where: {
      id: body.id,
    },
  });

  if (!existingReview) {
    throw new responseError(404, "Review not found");

    
  } else {
    return prismaClient.destination_reviews.update({
      where: {
        id: body.id,
      },
      data: {
        id: body.id,
        comment: body.comment,
        ratings: body.ratings,
      },
      select: {
        comment: true,
        review_by: true,
        ratings: true,
        review_by: true,
      },
    });
  }
};

const deleted = async (body) => {
  const deleteReview = await prismaClient.destination_reviews.delete({
    where: {
      id: body.id
    }
  })

  if(!deleteReview) {
    throw new responseError(401, "Your destination already delete")
  }
}

export default {
  destinationReview,
  update, 
  deleted
};
