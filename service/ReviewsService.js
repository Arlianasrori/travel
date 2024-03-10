import { validate } from "uuid";
import { destinationReview } from "../validation/destinationReview.js";
import { prismaClient } from "../config/db.js";

const destinationReviews = async (body) => {
  body.id = parseInt(
    Randomstring.generate({
      length: 7,
      charset: ["numeric"],
    })
  );
  body.destination_id = parseInt(body.destination_id);

  body = await validate(destinationReview, body);

  const destinationId = await prismaClient.destinations.crea
};
