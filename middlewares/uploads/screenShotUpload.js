const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
//storage
const multerStorage = multer.memoryStorage();

//file type checking
const screenShotUpload = multer({
    storage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
    //check file type
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
    //rejected files
    cb(
      {
        message: "Unsupported file format",
      },
      false
    );
  }
},
}).array('screenShotUpload', 5);

// const screenShotUpload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
//   limits: { fileSize: 1000000 },
// });

//Image Resizing
const screenShotResize = async (req, res, next) => {
  //check if there is no file
  if (!req.file) return next();
  req.file.filename = `project-${Date.now()}-${req.file.originalname}`;

  await sharp(req.file.buffer)
    .resize(550, 550)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(path.join(`public/images/screenshot/${req.file.filename}`));
  next();
};

module.exports = { screenShotUpload, screenShotResize };
