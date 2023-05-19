const catchAsync = require("../middlewares/catchAsync");
const AppError = require("../utils/AppError");
const userService = require("../services/user.service");
const authUtils = require("../utils/auth.util");
const StatusCode = require("../utils/Objects/StatusCode");
const sendResponse = require("../utils/response.util");

/**
 * Get user by username
 * @async
 * @function
 * @name signUp
 * @memberof module:userController
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
exports.user = async (req, res) => {
  const username = req.params.username;

  const user = await userService.user(username);
  sendResponse(req, res, StatusCode.OK, "User fetched successfully", user);
};

/**
 * Get all blogs of a user
 * @async
 * @function
 * @name allBlogs
 * @memberof module:userController
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
exports.allBlogs = async (req, res) => {
  const username = req.params.username;
  const blogs = await userService.allBlogs(username);
  sendResponse(req, res, StatusCode.OK, "Blogs fetched successfully", blogs);
};

/**
 * Update user by username
 * @async
 * @function
 * @name updateUser
 *  @memberof module:userController
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
exports.updateUser = async (req, res) => {
  const username = req.params.username;
  const { password } = req.body;
  const modifiedBody = { ...req.body };
  delete modifiedBody.password;

  if (username !== req.user.username) {
    throw new AppError(
      StatusCode.FORBIDDEN,
      "You are not allowed to perform this action."
    );
  }
  const user = await userService.updateUser(username, modifiedBody, password);
  sendResponse(req, res, StatusCode.OK, "User updated successfully", user);
};

/**
 * Update user password by username
 * @async 
 * @function
 * @name passwordUpdate
 * @memberof module:userController
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
exports.passwordUpdate = async (req, res) => {
  const username = req.params.username;
  const { oldPassword, newPassword } = req.body;

  if (username !== req.user.username) {
    throw new AppError(
      StatusCode.FORBIDDEN,
      "You are not allowed to perform this action."
    );
  }
  const user = await userService.passwordUpdate(
    username,
    oldPassword,
    newPassword
  );
  if (user) {
    sendResponse(req, res, StatusCode.OK, "Password updated successfully");
  }
};

/**
 * Delete user by username
 *  @async
 * @function
 * @name deleteUser
 * @memberof module:userController

 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
exports.deleteUser = async (req, res) => {
  const username = req.params.username;
  const password = req.body.password;
  if (username !== req.user.username) {
    throw new AppError(
      StatusCode.FORBIDDEN,
      "You are not allowed to perform this action."
    );
  }
  var user = await userService.deleteUser(username, password);
  if (user) {
    await authUtils.destroyCookie(res);
    sendResponse(req, res, StatusCode.OK, "User deleted successfully");
  }
};

/**
 * Update user image by username
 * @async
 * @function
 * @name updateImage
 * @memberof module:userController
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
exports.updateImage = async (req, res) => {
  const username = req.params.username;
  const imageUrl = req.file.url;
  const imagePublicId = req.file.public_id;
 

  if (username !== req.user.username) {
    throw new AppError(
      StatusCode.FORBIDDEN,
      "You are not allowed to perform this action."
    );
  }
  const user = await userService.updateImage(username, imageUrl, imagePublicId);

  sendResponse(req, res, StatusCode.OK, "Image updated successfully", user);
};

/**
 * Delete user image by username
 * @async
 * @function
 * @name deleteUserImage
 * @memberof module:userController
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
exports.deleteUserImage = async (req, res) => {
  const username = req.params.username;
  if (username !== req.user.username) {
    throw new AppError(
      StatusCode.FORBIDDEN,
      "You are not allowed to perform this action."
    );
  }
  const user = await userService.deleteUserImage(username);
  sendResponse(req, res, StatusCode.OK, "Image deleted successfully", user);
};

/**
 * Represents a module for handling user related operations such as fetching user, updating user, deleting user, etc.
 * @module userController
 */