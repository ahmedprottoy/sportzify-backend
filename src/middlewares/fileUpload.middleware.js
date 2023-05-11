const cloudinary = require("../config/cloudinary.config");
const AppError = require("../utils/AppError");
const catchAsync = require("./catchAsync");
const StatusCode = require("../utils/Objects/StatusCode");

exports.uploadImage = catchAsync((req, res, next) => {
  // Upload the image to Cloudinary
  const file = req.file;
  cloudinary.uploader
    .upload_stream({ resource_type: "auto" }, (error, result) => {
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
