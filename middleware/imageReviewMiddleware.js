import multer from "multer";

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("hay");
    return cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, new Date().getTime().toString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export {
    fileStorage,
    fileFilter
}
