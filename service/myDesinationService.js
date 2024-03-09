import Randomstring from "randomstring";
import { prismaClient } from "../config/db.js";
import { responseError } from "../error/responseError.js";

const myDestination = async (body) => {
  body.id = parseInt(Randomstring.generate({
      length: 7,
      charset: ["numeric"],
    }));
  body.destination_id = parseInt(body.destination_id);

  const destinationId = await prismaClient.destinations.findUnique({
    where: {
      id: body.destination_id,
    },
  });

  if (!destinationId) {
    throw new responseError(404, "Destination is not found");
  }

  console.log(body.id);
  const destination = await prismaClient.my_destination.findUnique({
    where: {
      id: body.id,
    },
  });

  if (destination) {
    throw new responseError(404, "Your destination has been added");
  } else {
    return prismaClient.my_destination.create({
      data: body,
    });
  }
};

const deleteMyDestination = async (body) => {
  const id = await prismaClient.my_destination.delete({
    where : {
      id: parseInt(body.id)
    }
  })

  if(!id) {
    throw new responseError (401, "Your destination already delete")
  }
}

export default {
  myDestination,
  deleteMyDestination
};
