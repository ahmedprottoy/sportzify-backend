const { validationResult } = require("express-validator");

exports.validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = {};
  console.log(errors);

  errors.array().forEach((error) => {
    if (!extractedErrors[error.param]) {
      extractedErrors[error.param] = [];
    }

    extractedErrors[error.param].push(error.msg);
  });

  return res.status(422).json({
    errors: extractedErrors,
  });
};
