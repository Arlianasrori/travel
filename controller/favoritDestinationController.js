import FavoritDestination from "../service/FavoritDestination.js";

const favoritDestination = async (req, res, next) => {
  try {
    const result = await FavoritDestination.destinationFavorit(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFavorit = async (req, res, next) => {
  try {
    const result = await FavoritDestination.deleteFavorit(req.body);
    res.status(200).json({
      data: result,
      msg: "Success",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  favoritDestination,
  deleteFavorit,
};
