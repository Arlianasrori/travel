import userService from "../service/userService.js";

const getUser = async (req, res, next) => {
  try {
    const email = req.body.email;
    const result = await userService.getUser(email);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(err);
  }
};


export default {
    getUser
}