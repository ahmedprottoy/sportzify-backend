const bcrypt = require("bcrypt");
const cloudinary = require("../config/cloudinary.config");
/**
 * Represents a module for authentication utilities.
 * @module authUtil
 */

/**
 * Hashes the provided password using bcrypt.
 * @async
 * @function
 * @name hashPassword
 * @memberof module:authUtil
 * @param {string} password - The password to be hashed.
 * @returns {Promise<string>} A promise that resolves with the hashed password.
 */
exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Compares the provided password with the hashed password.
 * @async
 * @function
 * @name comparePassword
 * @memberof module:authUtil
 * @param {string} inputPassword - The password to be compared.
 * @param {string} hashedPassword - The hashed password to be compared with.
 * @returns {Promise<boolean>} A promise that resolves with a boolean value indicating whether the passwords match.
 */
exports.comparePassword = async (inputPassword, hashedPassword) => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};

/**
 * sets a cookie in the response
 * @async
 * @function
 * @name setCookie
 * @memberof module:authUtil
 * @param {Object} res - The HTTP response object.
 * @param {string} token - The token to be set in the cookie.
 * @returns {Promise<void>}
 * @see setCookie
 */
exports.setCookie = async (res, token) => {
  res.cookie("authorization", token, {
    domain: process.env.COOKIE_DOMAIN,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
};

/**
 * Destroys the cookie in the response
 * @async
 * @function
 * @name destroyCookie
 * @memberof module:authUtil
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>}
 * @see destroyCookie
 */
exports.destroyCookie = async (res) => {
  res.clearCookie("authorization", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
};

/**
 * deletes an image from cloudinary
 * @async
 * @function
 * @name deleteImage
 * memberof module:authUtil
 * @param {string} imageId - The id of the image to be deleted.
 * @returns {Promise<void>}
 */
exports.deleteImage = async (imageId) => {
  await cloudinary.uploader.destroy(imageId);
};
