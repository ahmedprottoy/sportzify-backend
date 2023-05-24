const AppError = require("../../utils/AppError");
const StatusCode = require("../../utils/Objects/StatusCode");

describe("AppError", () => {
  it("should create an instance of AppError with the provided status code and message", () => {
    const statusCode = StatusCode.NOT_FOUND;
    const message = "User not found";

    const error = new AppError(statusCode, message);

    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(statusCode);
    expect(error.message).toBe(message);
    expect(error.status).toBe("fail");
    expect(error.stack).toBeDefined();
  });

  it("should set the status to 'error' if the status code starts with '5'", () => {
    const statusCode = StatusCode.INTERNAL_SERVER_ERROR;
    const message = "Internal server error";

    const error = new AppError(statusCode, message);

    expect(error.status).toBe("error");
  });
});
