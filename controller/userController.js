import userService from "../service/userService.js";

const getUser = async (req, res, next) => {
  try {
    const email = req.body.email;
    const result = await userService.getUser(email);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const email = req.body;

    const result = await userService.updateUser(email);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const result = await userService.getAllUser();
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getUser,
  updateUser,
  getAllUser,
};
