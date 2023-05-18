const { validationResult } = require("express-validator");
const StatusCode = require("../utils/Objects/StatusCode");

/**
 * Validates the request using the defined validation rules.
 * If there are validation errors, it sends a response with the errors.
 * Otherwise, it proceeds to the next middleware.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = {};

  errors.array().forEach((error) => {
    if (!extractedErrors[error.param]) {
      extractedErrors[error.param] = [];
    }

    extractedErrors[error.param].push(error.msg);
  });

  return res.status(StatusCode.BAD_REQUEST).json({
    errors: extractedErrors,
  });
};
