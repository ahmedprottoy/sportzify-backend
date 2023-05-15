/**
 * @class AppError
 * @extends Error
 * @param {number} statusCode - The status code of the error.
 * @param {string} message - The message of the error.
 * @returns {AppError} An instance of AppError.
 * @description Represents an error that occurs in the application.
 * @example
 * throw new AppError(StatusCode.NOT_FOUND, "User not found");
 * // => AppError: User not found 
 */
class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    // this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
