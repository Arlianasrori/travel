import reviewService from "../service/reviewService.js";

const review = async (req, res, next) => {
  try {
    const result = await reviewService.destinationReview(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await reviewService.update(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleted = async (req, res, next) => {
  try {
    const result = await reviewService.deleted(req.body)
    res.status(200).json({
      data: result,
      msg: "Success"
    })
  } catch (error) {
      next(error)
  }
}

export default {
  review,
  update,
  deleted
};
