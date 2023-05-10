const AppError = require("../utils/AppError");

// error handler middleware
const errorHandler = (err, req, res, next) => {
  console.log(err);

  if (!(err instanceof AppError)) {
    err.statusCode = 500;
    err.message = "Internal Server Error";
  }

  res.status(err.statusCode).send({
    status: err.status,
    message: err.message,
  });
};
module.exports = errorHandler;
