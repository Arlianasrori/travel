import myDesinationService from "../service/myDesinationService.js";

const myDestination = async (req, res, next) => {
  try {
    const result = await myDesinationService.myDestination(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMyDestination = async (req, res, next) => {
  try {
    const result = await myDesinationService.deleteMyDestination(req.body);
    res.status(200).json({
      data: result,
      msg: "success",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  myDestination,
  deleteMyDestination,
};
