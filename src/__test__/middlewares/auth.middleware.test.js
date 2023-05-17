const authMiddleware = require("../../middlewares/auth.middleware");
const authUtil = require("../../utils/jwt.util");
const AppError = require("../../utils/AppError");
const StatusCode = require("../../utils/Objects/StatusCode");
const catchAsync = require("../../middlewares/catchAsync");
const e = require("express");

jest.mock("../../utils/jwt.util");

describe("authMiddleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {};
    next = jest.fn();
  });

  describe("checkToken", () => {
    it("should pass if a valid token is provided", async () => {
      const token = "valid_token";
      authUtil.getCookie.mockResolvedValueOnce(token);
      authUtil.verifyAccessToken.mockResolvedValueOnce({ userId: "12345" });

      await authMiddleware.checkToken(req, res, next);

      expect(authUtil.getCookie).toHaveBeenCalledWith(req);
      expect(authUtil.verifyAccessToken).toHaveBeenCalledWith(token);
      expect(req.user).toEqual({ userId: "12345" });
      expect(next).toHaveBeenCalled();
    });

it("should throw an error if no token is provided", async () => {
  authUtil.getCookie.mockResolvedValueOnce(null);
  const next = jest.fn(); // Mock the `next` function

  const expectedError = new AppError(
    StatusCode.UNAUTHORIZED,
    "No Token Provided"
  );

  // Mock the behavior of the checkToken middleware
  const middleware = async (req, res, next) => {
    try {
      await authMiddleware.checkToken(req, res, next);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(expectedError.statusCode);
      expect(error.message).toBe(expectedError.message);
      expect(next).not.toHaveBeenCalled();
    }
  };

  await middleware(req, res, next);

  expect(authUtil.getCookie).toHaveBeenCalledWith(req);
});


    it("should throw an error if the token is invalid", async () => {
      const token = "invalid_token";
        
      authUtil.getCookie.mockResolvedValueOnce(token);
      authUtil.verifyAccessToken.mockRejectedValueOnce(
        new Error("Invalid token")
      );
      const next = jest.fn(); // Mock the `next` function
      const expectedError = new AppError(
        StatusCode.UNAUTHORIZED,
        "Invalid Token"
      );

      try {
        await authMiddleware.checkToken(req, res, next);
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.statusCode).toBe(expectedError.statusCode);
        expect(error.message).toBe(expectedError.message);
        expect(next).not.toHaveBeenCalled();
      }

      expect(authUtil.getCookie).toHaveBeenCalledWith(req);
      expect(authUtil.verifyAccessToken).toHaveBeenCalledWith(token);
      
    });
  });

    describe("isLoggedIn", () => {
      it("should pass if the user is not logged in", async () => {
        authUtil.getCookie.mockResolvedValueOnce(null);

        await authMiddleware.isLoggedIn(req, res, next);

        expect(authUtil.getCookie).toHaveBeenCalledWith(req);
        expect(next).toHaveBeenCalled();
      });

      it("should throw an error if the user is already logged in", async () => {
        const next = jest.fn();
        authUtil.getCookie.mockResolvedValueOnce("valid_token");

        
        try{
            await authMiddleware.isLoggedIn(req, res, next);
        }catch(error){
            expect(error).toBeInstanceOf(AppError);
            expect(error.statusCode).toBe(StatusCode.UNAUTHORIZED);
            expect(error.message).toBe("Already Logged In");
            expect(next).not.toHaveBeenCalled();
        }
        expect(authUtil.getCookie).toHaveBeenCalledWith(req);
        
      });
    });
});
