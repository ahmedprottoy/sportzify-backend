// generate a function that will wrap the async function and catch any errors that occur when it is called using try catch
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
