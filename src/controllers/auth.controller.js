const authService = require("../services/auth.service");
const catchAsync = require("../middlewares/catchAsync");
const authUtil = require("../utils/auth.util");
const sendResponse = require("../utils/response.util");
const StatusCode = require("../utils/Objects/StatusCode");
/**
 * @namespace authController
 * @desc A module for handling authentication-related controllers.
 */
/**
 * Signs up a new user.
 * @async
 * @function
 * @name signUp
 * @memberof module:authController
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the user is created.
 */
exports.signUp = async (req, res, next) => {
  const user = await authService.createUser(req.body);
  sendResponse(req, res, StatusCode.CREATED, "User created");
};

/**
 * Signs in a user.
 * @async
 * @function
 * @name signIn
 * @memberof module:authController
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the user is logged in.
 */
exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;
  const token = await authService.signIn(email, password, res);
  sendResponse(req, res, StatusCode.OK, "User logged in", { token });
};

/**
 * Signs out a user.
 * @async
 * @function
 * @name signOut
 * @memberof module:authController
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the user is logged out.
 */
exports.signOut = async (req, res, next) => {
  await authUtil.destroyCookie(res);
  sendResponse(req, res, StatusCode.OK, "User logged out");
};

/**
 * Represents a module for handling authentication-related controllers.
 * @module authController
 */
