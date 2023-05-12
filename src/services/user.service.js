const StatusCode = require("../utils/Objects/StatusCode");
const AppError = require("../utils/AppError");
// const {
//   userRepo.getUserById,
//   updateUser,
//   allBlogs,
//   deleteUser,
// } = require("../repositories/user.repo");
const userRepo = require("../repositories/user.repo");
const authUtil = require("../utils/auth.util");
const userDto = require("../dtos/user.dto");
const blogDto = require("../dtos/blog.dto");

exports.user = async (username) => {
  const userId = await userRepo.getUserIdByUsername(username);

  const user = await userRepo.getUserById(userId);

  if (!user) {
    throw new AppError(StatusCode.NOT_FOUND, "User not found");
  }

  return new userDto(user);
};

exports.updateUser = async (username, updateBody, password) => {
  const userId = await userRepo.getUserIdByUsername(username);
  const user = await userRepo.getUserById(userId);

  if (!user) {
    throw new AppError(StatusCode.NOT_FOUND, "User not found");
  }

  if (!(await authUtil.comparePassword(password, user.password))) {
    throw new AppError(StatusCode.UNAUTHORIZED, "Password is incorrect");
  }

  await userRepo.updateUser(userId, updateBody);

  const updatedUser = await userRepo.getUserById(userId);
  return new userDto(updatedUser);
};

exports.passwordUpdate = async (username, oldPassword, newPassword) => {
  const userId = await userRepo.getUserIdByUsername(username);
  const user = await userRepo.getUserById(userId);

  if (!user) {
    throw new AppError(StatusCode.NOT_FOUND, "User not found");
  }

  if (!(await authUtil.comparePassword(oldPassword, user.password))) {
    throw new AppError(StatusCode.UNAUTHORIZED, "Password is incorrect");
  }

  const hashedPassword = await authUtil.hashPassword(newPassword);

  await userRepo.updateUser(userId, { password: hashedPassword });

  return await userRepo.getUserById(userId);
};

exports.allBlogs = async (username) => {
  const userId = await userRepo.getUserIdByUsername(username);
  const user = await userRepo.getUserById(userId);

  if (!user) {
    throw new AppError(StatusCode.NOT_FOUND, "User not found");
  }
  const blogs = await userRepo.allBlogs(userId);
  return blogs.map((blog) => new blogDto(blog));
};

exports.deleteUser = async (username, password) => {
  const userId = await userRepo.getUserIdByUsername(username);
  const user = await userRepo.getUserById(userId);

  if (!user) {
    throw new AppError(StatusCode.NOT_FOUND, "User not found");
  }

  if (!(await authUtil.comparePassword(password, user.password))) {
    throw new AppError(StatusCode.BAD_REQUEST, "Password is incorrect");
  }

  return await userRepo.deleteUser(userId);
};

exports.updateImage = async (username, imageUrl, imagePublicId) => {
  const userId = await userRepo.getUserIdByUsername(username);
  const user = await userRepo.getUserById(userId);

  if (!user) {
    throw new AppError(StatusCode.NOT_FOUND, "User not found");
  }

  await userRepo.updateUser(userId, { imageUrl, imagePublicId });

  const updatedUser = await userRepo.getUserById(userId);
  return new userDto(updatedUser);
};

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
