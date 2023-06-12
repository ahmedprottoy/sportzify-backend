const multer = require("multer");
const AppError = require("../utils/AppError");

/**
 * The multer module for handling file uploads.
 * @type {multer}
 * @namespace multerModule
 */

const storage = multer.memoryStorage();

/**
 * The multer upload middleware with configuration options.
 * @type {multer.Multer}
 * @memberof multerModule
 */
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  /**
   * The file filter function used by multer to validate file types.
   * @callback fileFilterCallback
   * @memberof multerModule
   * @param {Request} req - The HTTP request object.
   * @param {File} file - The file object being uploaded.
   * @param {function} callback - The callback function to indicate whether the file is accepted or rejected.
   * @param {Error} callback.error - An optional error object to pass if the file is rejected.
   * @param {boolean} callback.accept - A boolean value indicating whether the file is accepted or rejected.
   */
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

// Exported module
module.exports = upload;
