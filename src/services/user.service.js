const StatusCode = require("../utils/Objects/StatusCode");
const AppError = require("../utils/AppError");
const userRepo = require("../repositories/user.repo");
const authUtil = require("../utils/auth.util");
const userDto = require("../dtos/user.dto");
const blogDto = require("../dtos/blog.dto");

/**
 * Retrieves a user by username.
 *
 * @async
 * @function user
 * @memberof module:userService
 * @param {string} username - The username of the user to retrieve.
 * @returns {Promise<userDto>} A promise that resolves with the user DTO.
 * @throws {AppError} If an error occurs while retrieving the user or no user is found with the provided username.
 */
exports.user = async (username) => {
  const userId = await userRepo.getUserIdByUsername(username);

  if (!userId) {
    throw new AppError(StatusCode.NOT_FOUND, "User not found");
  }

  const user = await userRepo.getUserById(userId);
  return new userDto(user);
};

/**
 * Updates a user with the provided modified body.
 *
 * @async
 * @function updateUser
 * @memberof module:userService
 * @param {string} username - The username of the user to update.
 * @param {Object} updateBody - The modified user data.
 * @param {string} password - The user's current password.
 * @returns {Promise<userDto>} A promise that resolves with the updated user DTO.
 * @throws {AppError} If an error occurs while updating the user, no user is found with the provided username, or the password is incorrect.
 */
exports.updateUser = async (username, updateBody, password) => {
  const userId = await userRepo.getUserIdByUsername(username);

  if (!userId) {
    throw new AppError(StatusCode.NOT_FOUND, "User not found");
  }

  const user = await userRepo.getUserById(userId);

  if (!(await authUtil.comparePassword(password, user.password))) {
    throw new AppError(StatusCode.UNAUTHORIZED, "Password is incorrect");
  }

  await userRepo.updateUser(userId, updateBody);

  const updatedUser = await userRepo.getUserById(userId);
  return new userDto(updatedUser);
};

/**
 * Updates a user's password.
 *
 * @async
 * @function passwordUpdate
 * @memberof module:userService
 * @param {string} username - The username of the user to update the password.
 * @param {string} oldPassword - The user's current password.
 * @param {string} newPassword - The user's new password.
 * @returns {Promise<Object>} A promise that resolves with the updated user object.
 * @throws {AppError} If an error occurs while updating the password, no user is found with the provided username, or the old password is incorrect.
 */
exports.passwordUpdate = async (username, oldPassword, newPassword) => {
  const userId = await userRepo.getUserIdByUsername(username);
  
  if (!userId) {
    throw new AppError(StatusCode.NOT_FOUND, "User not found");
  }
  const user = await userRepo.getUserById(userId);

  if (!(await authUtil.comparePassword(oldPassword, user.password))) {
    throw new AppError(StatusCode.UNAUTHORIZED, "Password is incorrect");
  }

  const hashedPassword = await authUtil.hashPassword(newPassword);

  await userRepo.updateUser(userId, { password: hashedPassword });

  return await userRepo.getUserById(userId);
};

/**
 * Retrieves all blogs of a user.
 *
 * @async
 * @function allBlogs
 * @memberof module:userService
 * @param {string} username - The username of the user.
 * @returns {Promise<blogDto[]>} A promise that resolves with an array of blog DTOs.
 * @throws {AppError} If an error occurs while retrieving the blogs or no user is found with the provided username.
 */
exports.allBlogs = async (username) => {
  const userId = await userRepo.getUserIdByUsername(username);

  if (!userId) {
    throw new AppError(StatusCode.NOT_FOUND, "User not found");
  }

  const blogs = await userRepo.allBlogs(userId);
  return blogs.map((blog) => new blogDto(blog));
};

/**
 * Deletes a user with the provided username and password.
 *
 * @async
 * @function deleteUser
 * @memberof module:userService
 * @param {string} username - The username of the user to delete.
 * @param {string} password - The user's password for authentication.
 * @returns {Promise<void>} A promise that resolves when the user is deleted.
 * @throws {AppError} If an error occurs while deleting the user, no user is found with the provided username, or the password is incorrect.
 */
// exports.deleteUser = async (username, password) => {
//   const userId = await userRepo.getUserIdByUsername(username);
//   const user = await userRepo.getUserById(userId);

//   if (!user) {
//     throw new AppError(StatusCode.NOT_FOUND, "User not found");
//   }

//   if (!(await authUtil.comparePassword(password, user.password))) {
//     throw new AppError(StatusCode.BAD_REQUEST, "Password is incorrect");
//   }

//   return await userRepo.deleteUser(userId);
// };

/**
 * Updates the image of a user.
 *
 * @async
 * @function updateImage
 * @memberof module:userService
 * @param {string} username - The username of the user.
 * @param {string} imageUrl - The URL of the user image.
 * @param {string} imagePublicId - The public ID of the user image.
 * @returns {Promise<userDto>} A promise that resolves with the updated user DTO.
 * @throws {AppError} If an error occurs while updating the image or no user is found with the provided username.
 */
exports.updateImage = async (username, imageUrl, imagePublicId) => {
  const userId = await userRepo.getUserIdByUsername(username);
  
  if (!userId) {
    throw new AppError(StatusCode.NOT_FOUND, "User not found");
  }
  

  await userRepo.updateUser(userId, { imageUrl, imagePublicId });

  const updatedUser = await userRepo.getUserById(userId);
  return new userDto(updatedUser);
};

/**
 * Deletes the image of a user.
 *
 * @async
 * @function deleteUserImage
 * @memberof module:userService
 * @param {string} username - The username of the user.
 * @returns {Promise<userDto>} A promise that resolves with the updated user DTO.
 * @throws {AppError} If an error occurs while deleting the image or no user is found with the provided username.
 */
exports.deleteUserImage = async (username) => {
  const userId = await userRepo.getUserIdByUsername(username);
  const user = await userRepo.getUserById(userId);

  if (!user) {
    throw new AppError(StatusCode.NOT_FOUND, "User not found");
  }

  await userRepo.updateUser(userId, { imageUrl: null, imagePublicId: null });
  await authUtil.deleteImage(user.imagePublicId);

  const updatedUser = await userRepo.getUserById(userId);
  return new userDto(updatedUser);
};

/**
 * Represents a module for handling user-related services.
 *
 * @module userService
 */
