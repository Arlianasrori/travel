import { prismaClient } from "../config/db.js";
import { responseError } from "../error/responseError.js";
import Randomstring from "randomstring";

const destinationFavorit = async (body) => {
  body.id = parseInt(
    Randomstring.generate({
      length: 7,
      charset: ["numeric"],
    })
  );
  body.destination_id = parseInt(body.destination_id);

  const destinationId = await prismaClient.destinations.findUnique({
    where: {
      id: body.destination_id,
    },
  });

  if (!destinationId) {
    throw new responseError(404, "destination is not found");
  }

  const addFavorit = await prismaClient.my_favorite.findUnique({
    where: {
      id: body.id,
    },
  });

  if (addFavorit) {
    throw new responseError(401, "Destination already add to favorite");
  } else {
    return prismaClient.my_favorite.create({
      data: body,
    });
  }
};

const deleteFavorit = async (body) => {
  const id = await prismaClient.my_favorite.delete({
    where: {
      id: parseInt(body.id),
    },
  });

  if (!id) {
    throw new responseError(401, "Your destination already delete");
  }
};

export default {
  destinationFavorit,
  deleteFavorit,
};
