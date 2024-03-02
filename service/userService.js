import { prismaClient } from "../config/db.js";
import { responseError } from "../error/responseError.js";
import {
  getUserValidation,
  updateUserValidation,
} from "../validation/userValidation.js";
import { validate } from "../validation/validation.js";

const getUser = async (email) => {
  email = await validate(getUserValidation, email);

  const user = await prismaClient.users.findUnique({
    where: {
      email: email,
    },
    select: {
      email: true,
      name: true,
      no_hp: true,
      verify: true,
      isAdmin: true,
      foto_profile: true,
    },
  });

  if (!user) {
    throw new responseError(404, "User is not found");
  }
  return user;
};

const updateUser = async (req) => {
  const user = validate(updateUserValidation, req);

  const totalUserInDatabase = await prismaClient.users.findUnique({
    where: {
      email: user.email,
    },
  });

  if(!totalUserInDatabase ) {
    throw new responseError(404, "User is not found")
  }

  const data = {}

  if(user.name) {
    data.name = user.name
  }

  if (user.no_hp) {
    data.no_hp = user.no_hp
  }

  prismaClient.users.update ({
    where: {
        email: user.email
    },
    data: data,
    select: {
        email: true,
        name: true,
        no_hp: true,
        verify: true,
        isAdmin: true,
        foto_profile: true,
      },
  })
};

export default {
  getUser,
};
