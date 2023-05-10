const StatusCode = require("../utils/Objects/StatusCode");
const AppError = require("../utils/AppError");
const {
  getUserById,
  updateUser,
  allBlogs,
  deleteUser,
} = require("../repositories/user.repo");
const authUtil = require("../utils/auth.util");

exports.user = async (userId) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new AppError(StatusCode.NOT_FOUND, "User not found");
  }

  return user;
};

exports.updateUser = async (userId, updateBody, password) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new AppError(StatusCode.NOT_FOUND, "User not found");
  }

  if (!(await authUtil.comparePassword(password, user.password))) {
    throw new AppError(StatusCode.BAD_REQUEST, "Password is incorrect");
  }

  await updateUser(userId, updateBody);

  return await getUserById(userId);
};

exports.passwordUpdate = async (userId, oldPassword, newPassword) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new AppError(StatusCode.NOT_FOUND, "User not found");
  }

  if (!(await authUtil.comparePassword(oldPassword, user.password))) {
    throw new AppError(StatusCode.BAD_REQUEST, "Password is incorrect");
  }

  const hashedPassword = await authUtil.hashPassword(newPassword);

  await updateUser(userId, { password: hashedPassword });

  return await getUserById(userId);
};

exports.allBlogs = async (userId) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new AppError(StatusCode.NOT_FOUND, "User not found");
  }

  const blogs = await allBlogs(userId);
  return blogs;
};

exports.deleteUser = async (userId, password) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new AppError(StatusCode.NOT_FOUND, "User not found");
  }

  if (!(await authUtil.comparePassword(password, user.password))) {
    throw new AppError(StatusCode.BAD_REQUEST, "Password is incorrect");
  }

  return await deleteUser(userId);
};
