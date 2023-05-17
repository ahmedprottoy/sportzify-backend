const errorHandler = require("../../middlewares/errorHandler");
const sendResponse = require("../../utils/response.util");
const AppError = require("../../utils/AppError");

describe("errorHandler", () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: { accept: "application/json" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should handle AppError correctly", () => {
    const err = new AppError(404, "Not Found");
    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Not Found" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should handle non-AppError correctly", () => {
    const err = new Error("Something went wrong");
    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
    expect(next).not.toHaveBeenCalled();
  });
});
