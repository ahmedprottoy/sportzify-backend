const authService = require("../services/auth.service");
const catchAsync = require("../middlewares/catchAsync");
const authUtil = require("../utils/auth.util");
const sendResponse = require("../utils/response.util");
const StatusCode = require("../utils/Objects/StatusCode");

exports.signUp = catchAsync(async (req, res) => {
  const user = await authService.createUser(req.body);

  sendResponse(req, res, StatusCode.CREATED, "user Created");
});

exports.signIn = catchAsync(async (req, res) => {
  console.log("hitting sign in route");
  const { email, password } = req.body;
  const token = await authService.signIn(email, password, res);

  sendResponse(req, res, StatusCode.OK, "user logged In", { token });
});

exports.signOut = catchAsync(async (req, res) => {
  await authUtil.destroyCookie(res);

  sendResponse(req, res, StatusCode.OK, "user logged out");
});
