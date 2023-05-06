const authService = require("../services/auth.service");
const catchAsync = require("../middlewares/catchAsync");
const authUtil = require("../utils/auth.util");

exports.signUp = catchAsync(async (req, res) => {
  const user = await authService.createUser(req.body);

  res.status(201).json({ message: "user Created" });
});

exports.signIn = catchAsync(async (req, res) => {
  console.log("hitting sign in route");
  const { email, password } = req.body;
  const token = await authService.signIn(email, password);

  await authUtil.setCookie(res, token);

  res.status(200).json({
    message: "user logged In",
    token: token,
  });
});

exports.signOut = catchAsync(async (req, res) => {
  await authUtil.destroyCookie(res);

  res.status(200).json({ message: "user logged out" });
});
