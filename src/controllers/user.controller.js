const catchAsync = require("../middlewares/catchAsync");
const userModel = require("../models/user.model");
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
  console.log(userId);
  console.log(req.body);
  const { username, email, password, firstname, lastname, age } = req.body;

  // const user = await userService.updateUser(userId, req.body);

  // res.status(200).json({ user });
});
