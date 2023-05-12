const catchAsync = require("../middlewares/catchAsync");
const AppError = require("../utils/AppError");
const userService = require("../services/user.service");
const authUtils = require("../utils/auth.util");
const StatusCode = require("../utils/Objects/StatusCode");
const sendResponse = require("../utils/response.util");

exports.user = catchAsync(async (req, res) => {
  const username = req.params.username;

  const user = await userService.user(username);
  sendResponse(req, res, StatusCode.OK, "User fetched successfully", user);
});

exports.allBlogs = catchAsync(async (req, res) => {
  const username = req.params.username;
  const blogs = await userService.allBlogs(username);
  sendResponse(req, res, StatusCode.OK, "Blogs fetched successfully", blogs);
});

exports.updateUser = catchAsync(async (req, res) => {
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
});

exports.passwordUpdate = catchAsync(async (req, res) => {
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
});

exports.deleteUser = catchAsync(async (req, res) => {
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
});

exports.updateImage = catchAsync(async (req, res) => {
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
});

exports.deleteUserImage = catchAsync(async (req, res) => {
  const userId = req.params.id;
  if (userId !== req.user.userId) {
    throw new AppError(
      StatusCode.FORBIDDEN,
      "You are not allowed to perform this action."
    );
  }
  const user = await userService.deleteUserImage(userId);
  sendResponse(req, res, StatusCode.OK, "Image deleted successfully", user);
});
