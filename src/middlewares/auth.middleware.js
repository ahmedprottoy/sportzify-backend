const authUtil = require("../utils/jwt.util");
const AppError = require("../utils/AppError");
const StatusCode = require("../utils/Objects/StatusCode");

exports.checkToken = async (req, res, next) => {
  const token = await authUtil.getCookie(req);

  if (!token) {
    throw new AppError(StatusCode.UNAUTHORIZED, "No Token Provided");
  }

  try {
    const decoded = await authUtil.verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    throw new AppError(StatusCode.UNAUTHORIZED, "Invalid Token");
  }
};