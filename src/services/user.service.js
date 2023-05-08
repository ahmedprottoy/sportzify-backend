const StatusCode = require("../utils/Objects/StatusCode");
const AppError = require("../utils/AppError");
const { getUserById, updateUser } = require("../repositories/user.repo");
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
