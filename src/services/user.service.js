const StatusCode = require("../utils/Objects/StatusCode");
const AppError = require("../utils/AppError");
const { getUserById } = require("../repositories/user.repo");

exports.user = async (userId) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new AppError(StatusCode.NOT_FOUND, "User not found");
  }

  return user;
};
