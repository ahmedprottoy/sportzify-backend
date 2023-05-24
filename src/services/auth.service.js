const AppError = require("../utils/AppError");
const uuid = require("uuid");
const authUtil = require("../utils/auth.util");
const { hashPassword, comparePassword } = require("../utils/auth.util");
const { generateAccessToken } = require("../utils/jwt.util");
const StatusCode = require("../utils/Objects/StatusCode");
const {
  getUserByEmail,
  getUserByUsername,
  createUser,
} = require("../repositories/auth.repo");

/**
 * @module authService
 * @desc A module that provides services for the authentication and authorization of users.
 */

/**
 * Creates a new user with the provided details.
 * @async
 * @function
 * @name createUser
 * @memberof module:authService
 * @param {Object} userDetails - The details of the user to be created.
 * @param {string} userDetails.username - The username of the user.
 * @param {string} userDetails.email - The email of the user.
 * @param {string} userDetails.fullname - The full name of the user.
 * @param {string} userDetails.password - The password of the user.
 * @returns {Promise<Object>} A promise that resolves with the created user object.
 * @throws {AppError} If the email or username already exists.
 */
exports.createUser = async ({ username, email, fullname, password }) => {
  if (await getUserByEmail(email)) {
    throw new AppError(StatusCode.CONFLICT, "Email already exists");
  }

  if (await getUserByUsername(username)) {
    throw new AppError(StatusCode.CONFLICT, "Username already exists");
  }

  const hashedPassword = await hashPassword(password);
  const uniqueId = uuid.v4().toString();

  const User = await createUser({
    user_id: uniqueId,
    username,
    password: hashedPassword,
    email,
    fullname,
  });

  return User;
};

/**
 * Signs in a user with the provided email and password.
 * @async
 * @function
 * @name signIn
 * @memberof module:authService
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<string>} A promise that resolves with the authentication token.
 * @throws {AppError} If the user is not found or the password is incorrect.
 */
exports.signIn = async (email, password, res) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new AppError(StatusCode.NOT_FOUND, "User not found");
  }

  if (!(await comparePassword(password, user.password))) {
    throw new AppError(StatusCode.UNAUTHORIZED, "Incorrect password");
  }

  const token = await generateAccessToken(user.username);

  await authUtil.setCookie(res, token);

  return token;
};
