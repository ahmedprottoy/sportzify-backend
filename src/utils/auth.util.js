const bcrypt = require("bcrypt");
const cloudinary = require("../config/cloudinary.config");

exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

exports.comparePassword = async (inputPassword, hashedPassword) => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};

exports.setCookie = async (res, token) => {
  res.cookie("authorization", token, {
    httpOnly: true,
    sameSite: "none",
    secure: false,
  });
};

exports.destroyCookie = async (res) => {
  res.clearCookie("authorization");
};

exports.deleteImage = async (imageId) => {
  await cloudinary.uploader.destroy(imageId);
};
