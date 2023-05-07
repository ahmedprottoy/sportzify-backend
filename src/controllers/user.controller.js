const catchAsync = require("../middlewares/catchAsync");
const userModel = require("../models/user.model");
const userService = require("../services/user.service");

exports.user = async (req, res) => {
  const userId = req.params.id;

  const user = await userService.user(userId);

  res.status(200).json({ user });
};

exports.allBlogs = async (req, res) => {
  console.log("getting every blogs of specified user");
};
