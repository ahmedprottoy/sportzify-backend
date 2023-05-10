const catchAsync = require("../middlewares/catchAsync");
const AppError = require("../utils/AppError");
const userService = require("../services/user.service");
const authUtils = require("../utils/auth.util");
const StatusCode = require("../utils/Objects/StatusCode");
const sendResponse = require("../utils/response.util");

exports.user = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const user = await userService.user(userId);
  sendResponse(req, res, StatusCode.OK, "User fetched successfully", user);
});

exports.allBlogs = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const blogs = await userService.allBlogs(userId);
  sendResponse(req, res, StatusCode.OK, "Blogs fetched successfully", blogs);
});

exports.updateUser = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const { password } = req.body;
  const modifiedBody = { ...req.body };
  delete modifiedBody.password;

  if (userId !== req.user.userId) {
    throw new AppError(
      StatusCode.FORBIDDEN,
      "You are not allowed to perform this action."
    );
  }
  const user = await userService.updateUser(userId, modifiedBody, password);
  sendResponse(req, res, StatusCode.OK, "User updated successfully", user);
});

exports.passwordUpdate = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const { oldPassword, newPassword } = req.body;

  if (userId !== req.user.userId) {
    throw new AppError(
      StatusCode.FORBIDDEN,
      "You are not allowed to perform this action."
    );
  }
  const user = await userService.passwordUpdate(
    userId,
    oldPassword,
    newPassword
  );
  if (user) {
    sendResponse(req, res, StatusCode.OK, "Password updated successfully");
  }
});

exports.deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const password = req.body.password;
  if (userId !== req.user.userId) {
    throw new AppError(
      StatusCode.FORBIDDEN,
      "You are not allowed to perform this action."
    );
  }
  var user = await userService.deleteUser(userId, password);
  if (user) {
    await authUtils.destroyCookie(res);
    sendResponse(req, res, StatusCode.OK, "User deleted successfully");
  }
});
