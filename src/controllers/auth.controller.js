const authService = require("../services/auth.service");
const catchAsync = require("../middlewares/catchAsync");

exports.signUp = catchAsync(async (req, res) => {
  console.log("hitting sign up route");
  const user = await authService.createUser(req.body);

  res.status(201).json({ message: "user Created" });
});

exports.signIn = async (req, res) => {
  console.log("hitting sign in route");
};
exports.signOut = async (req, res) => {
  console.log("hitting sign out route");
};
