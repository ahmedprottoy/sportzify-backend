/**
 * Wrapper function to catch asynchronous errors in Express middleware or route handlers.
 *
 * @param {Function} fn - Asynchronous function to be wrapped.
 * @returns {Function} - Express middleware function with error handling.
 * @memberof module:catchAsync
 */
const catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

module.exports = catchAsync;

/**
 * Represents a module for handling asynchronous error catching in Express middleware or route handlers.
 * @module catchAsync
 */
