import imageReview from "../service/imageReview.js";

const upload = async (req, res, next) => {
  try {
    const images = req.files.images;
    const url = `http://${req.hostname}/public/images`
    const body = req.body
    const result = await imageReview.upload(body,images,url);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deleteImage = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    const result = await imageReview.deleteImage(id);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  upload,
  deleteImage
};
