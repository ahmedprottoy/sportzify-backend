const cloudinary = require("../config/cloudinary.config");
const AppError = require("../utils/AppError");
const catchAsync = require("./catchAsync");
const StatusCode = require("../utils/Objects/StatusCode");

/**
 * Middleware for uploading an image to Cloudinary.
 *
 * @memberof module:fileUpload
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next function to pass control to the next middleware.
 * @returns {Promise<void>}
 */
exports.uploadImage = catchAsync((req, res, next) => {
  // Upload the image to Cloudinary
  const file = req.file;
  cloudinary.uploader
    .upload_stream({ resource_type: "auto",folder: "sportzify" }, (error, result) => {
      if (error) {
        throw new AppError(
          StatusCode.INTERNAL_SERVER_ERROR,
          "Failed to upload image"
        );
      } else {
        console.log("Image uploaded successfully");
        req.file = result;

        next();
      }
    })
    .end(file.buffer);
});

/**
 * Represents a module for handling image upload related middlewares.
 * @module fileUpload
 */
