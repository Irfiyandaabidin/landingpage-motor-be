const multer = require("multer");

const multerFiltering = (req, file, cb) => {
  if(
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    throw new Error("Format image salah");
  }
};

const upload = multer({
  fileFilter: multerFiltering,
});

module.exports = upload;