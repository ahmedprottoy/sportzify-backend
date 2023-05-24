const authUtil = require("../utils/jwt.util");
const AppError = require("../utils/AppError");
const StatusCode = require("../utils/Objects/StatusCode");
const catchAsync = require("./catchAsync");

/**
 * Check if a valid token is provided in the request header
  * @async
 * @function
 * @name checkToken
 * @memberof module:authMiddleware  
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next function to pass control to the next middleware
 * @returns {Promise<void>}
 * @throws {AppError} - If no token is provided or if the token is invalid

 * 
 */
exports.checkToken = catchAsync(async (req, res, next) => {
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
});

/**
 * Check if the user is already logged in
 * @async
 * @function
 * @name isLoggedIn
 * @memberof module:authMiddleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next function to pass control to the next middleware
 * @returns {Promise<void>}
 * @throws {AppError} - If the user is already logged in
 *
 */
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  const token = await authUtil.getCookie(req);
  if (token) {
    throw new AppError(StatusCode.UNAUTHORIZED, "Already Logged In");
  }
  return next();
});

/**
 * Represents a module for handling authentication-related middlewares.
 * @module authMiddleware
 */
