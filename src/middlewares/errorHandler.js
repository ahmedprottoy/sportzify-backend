const AppError = require("../utils/AppError");
const sendResponse = require("../utils/response.util");

const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (!(err instanceof AppError)) {
    err.statusCode = 500;
    err.message = "Internal Server Error";
  }
  sendResponse(req, res, err.statusCode, err.message);
};
module.exports = errorHandler;
