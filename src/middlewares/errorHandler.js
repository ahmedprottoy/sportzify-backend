const AppError = require("../utils/AppError");
const sendResponse = require("../utils/response.util");

/**
 * Error handling middleware for Express.
 *
 * @param {Error} err - The error object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next function to pass control to the next middleware.
 * @memberof module:errorHandler
 */
const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (!(err instanceof AppError)) {
    err.statusCode = 500;
    err.message = "Internal Server Error";
  }
  sendResponse(req, res, err.statusCode, err.message);
};

module.exports = errorHandler;

/**
 * Represents a module for handling errors in Express middleware or route handlers.
 * @module errorHandler
 */
