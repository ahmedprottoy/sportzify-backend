const multer = require("multer");
const AppError = require("../utils/AppError");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },

  fileFilter: (req, file, callback) => {
    if (
      file.mimetype.startsWith("image/") &&
      /\.(jpg|jpeg|png)$/.test(file.originalname)
    ) {
      callback(null, true);
    } else {
      callback(new AppError(400, "Only JPEG and PNG file formats are allowed"));
    }
  },
});

module.exports = upload;
