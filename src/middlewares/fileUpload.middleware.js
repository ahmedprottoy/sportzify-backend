const cloudinary = require("../config/cloudinary.config");

exports.uploadImage = (req, res, next) => {
  // Upload the image to Cloudinary
  const file = req.file;
  cloudinary.uploader
    .upload_stream({ resource_type: "auto" }, (error, result) => {
      if (error) {
        console.log("Error uploading image:", error);
        res.status(500).json({ error: "Failed to upload image" });
      } else {
        console.log("Image uploaded successfully");
        req.file = result;

        next();
      }
    })
    .end(file.buffer);
};
