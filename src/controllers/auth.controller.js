const userService = require("../services/user.service");
const catchAsync = require("../middlewares/catchAsync");

exports.signUp = catchAsync(async (req, res) => {
  const { username, email, firstname, lastname, age, password } = req.body;
  const userInfo = { username, email, firstname, lastname, age, password };
  await userService.createUser(userInfo, res);
});

exports.signIn = async (req, res) => {
  console.log("hitting sign in route");
};
exports.signOut = async (req, res) => {
  console.log("hitting sign out route");
};
