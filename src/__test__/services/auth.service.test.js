const authService = require("../../services/auth.service");
const authUtil = require("../../utils/auth.util");
const AppError = require("../../utils/AppError");
const {
  getUserByEmail,
  getUserByUsername,
  createUser,
} = require("../../repositories/auth.repo");
const { hashPassword, comparePassword } = require("../../utils/auth.util");
const { generateAccessToken } = require("../../utils/jwt.util");
const StatusCode = require("../../utils/Objects/StatusCode");

jest.mock("../../repositories/auth.repo.js");
jest.mock("../../utils/auth.util");
jest.mock("../../utils/jwt.util");
jest.mock("../../utils/auth.util");

describe("authService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const userDetails = {
        username: "john_doe",
        email: "john.doe@example.com",
        fullname: "John Doe",
        password: "password123",
      };

      getUserByEmail.mockResolvedValue(null);
      getUserByUsername.mockResolvedValue(null);
      hashPassword.mockResolvedValue("hashedPassword");
      createUser.mockResolvedValue(userDetails);

      const result = await authService.createUser(userDetails);

      expect(getUserByEmail).toHaveBeenCalledWith(userDetails.email);
      expect(getUserByUsername).toHaveBeenCalledWith(userDetails.username);
      expect(hashPassword).toHaveBeenCalledWith(userDetails.password);
      expect(createUser).toHaveBeenCalledWith({
        user_id: expect.any(String),
        username: userDetails.username,
        password: "hashedPassword",
        email: userDetails.email,
        fullname: userDetails.fullname,
      });

      expect(result).toEqual(userDetails);
    });

    it("should throw an AppError if email already exists", async () => {
      const userDetails = {
        username: "john_doe",
        email: "john.doe@example.com",
        fullname: "John Doe",
        password: "password123",
      };

      getUserByEmail.mockResolvedValue(true);

      await expect(authService.createUser(userDetails)).rejects.toThrow(
        new AppError(StatusCode.CONFLICT, "Email already exists")
      );

      expect(getUserByEmail).toHaveBeenCalledWith(userDetails.email);
      expect(getUserByUsername).not.toHaveBeenCalled();
      expect(hashPassword).not.toHaveBeenCalled();
      expect(createUser).not.toHaveBeenCalled();
    });

    it("should throw an AppError if username already exists", async () => {
      const userDetails = {
        username: "john_doe",
        email: "john.doe@example.com",
        fullname: "John Doe",
        password: "password123",
      };

      getUserByEmail.mockResolvedValue(null);
      getUserByUsername.mockResolvedValue(true);

      await expect(authService.createUser(userDetails)).rejects.toThrow(
        new AppError(StatusCode.CONFLICT, "Username already exists")
      );

      expect(getUserByEmail).toHaveBeenCalledWith(userDetails.email);
      expect(getUserByUsername).toHaveBeenCalledWith(userDetails.username);
      expect(hashPassword).not.toHaveBeenCalled();
      expect(createUser).not.toHaveBeenCalled();
    });
  });

  describe("signIn", () => {
    it("should sign in a user and return an authentication token", async () => {
      const email = "john.doe@example.com";
      const password = "password123";
      const res = {
        /* mock HTTP response object */
        setCookie: jest.fn(),
      };
      const user = {
        username: "john_doe",
        password: "hashedPassword",
      };
      const token = "authenticationToken";

      getUserByEmail.mockResolvedValue(user);
      comparePassword.mockResolvedValue(true);
      generateAccessToken.mockResolvedValue(token);
      authUtil.setCookie.mockResolvedValue();

      const result = await authService.signIn(email, password, res);

      expect(getUserByEmail).toHaveBeenCalledWith(email);
      expect(comparePassword).toHaveBeenCalledWith(password, user.password);
      expect(generateAccessToken).toHaveBeenCalledWith(user.username);
      expect(authUtil.setCookie).toHaveBeenCalledWith(res, token);

      expect(result).toEqual(token);
    });

    it("should throw an AppError if user is not found", async () => {
      const email = "john.doe@example.com";
      const password = "password123";
      const res = {
        /* mock HTTP response object */
        setCookie: jest.fn(),
      };

      getUserByEmail.mockResolvedValue(null);

      await expect(authService.signIn(email, password, res)).rejects.toThrow(
        new AppError(StatusCode.NOT_FOUND, "User not found")
      );

      expect(getUserByEmail).toHaveBeenCalledWith(email);
      expect(comparePassword).not.toHaveBeenCalled();
      expect(generateAccessToken).not.toHaveBeenCalled();
      expect(authUtil.setCookie).not.toHaveBeenCalled();
    });

    it("should throw an AppError if password is incorrect", async () => {
      const email = "john.doe@example.com";
      const password = "password123";
      const res = {
        /* mock HTTP response object */
        setCookie: jest.fn(),
      };
      const user = {
        username: "john_doe",
        password: "hashedPassword",
      };

      getUserByEmail.mockResolvedValue(user);
      comparePassword.mockResolvedValue(false);

      await expect(authService.signIn(email, password, res)).rejects.toThrow(
        new AppError(StatusCode.UNAUTHORIZED, "Incorrect password")
      );

      expect(getUserByEmail).toHaveBeenCalledWith(email);
      expect(comparePassword).toHaveBeenCalledWith(password, user.password);
      expect(generateAccessToken).not.toHaveBeenCalled();
      expect(authUtil.setCookie).not.toHaveBeenCalled();
    });
  });
});
