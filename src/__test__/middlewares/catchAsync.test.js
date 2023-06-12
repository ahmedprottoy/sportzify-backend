const catchAsync = require("../../middlewares/catchAsync");

describe("catchAsync", () => {
  it("should catch and handle asynchronous errors", async () => {
    const mockFn = jest.fn().mockRejectedValueOnce(new Error("Async error"));
    const req = {};
    const res = {};
    const next = jest.fn();

    const middleware = catchAsync(mockFn);
    await middleware(req, res, next);

    expect(mockFn).toHaveBeenCalledWith(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("should pass control to the next middleware when there is no error", async () => {
    const mockFn = jest.fn().mockResolvedValueOnce();
    const req = {};
    const res = {};
    const next = jest.fn();

    const middleware = catchAsync(mockFn);
    await middleware(req, res, next);

    expect(mockFn).toHaveBeenCalledWith(req, res, next);
    expect(next).not.toHaveBeenCalled();
  });
});
