const catchAsync = require("../middlewares/catchAsync");
// const userModel = require("../models/user.model");
const userService = require("../services/user.service");

exports.user = catchAsync(async (req, res) => {
  const userId = req.params.id;

  const user = await userService.user(userId);

  res.status(200).json({ user });
});

exports.allBlogs = async (req, res) => {
  console.log("getting every blogs of specified user");
};

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

  // const user = await userService.updateUser(userId, req.body);

  res.status(200).json({ user });
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
    res.status(200).json({ message: "Password updated successfully" });
  }
});
