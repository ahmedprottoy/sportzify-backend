const authUtil = require("../utils/jwt.util");
const AppError = require("../utils/AppError");
const StatusCode = require("../utils/Objects/StatusCode");
const catchAsync = require("./catchAsync");

exports.checkToken = catchAsync(async (req, res, next) => {
  const token = await authUtil.getCookie(req);

  if (!token) {
    throw new AppError(StatusCode.UNAUTHORIZED, "No Token Provided");
  }

  try {
    const decoded = await authUtil.verifyAccessToken(token);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    throw new AppError(StatusCode.UNAUTHORIZED, "Invalid Token");
  }
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  const token = await authUtil.getCookie(req);

  if (token) {
    throw new AppError(StatusCode.UNAUTHORIZED, "Already Logged In");
  }

  return next();
});
