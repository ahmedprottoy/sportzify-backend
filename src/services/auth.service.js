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

exports.signIn = async (email, password, res) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new AppError(StatusCode.NOT_FOUND, "User not found");
  }

  if (!(await comparePassword(password, user.password))) {
    throw new AppError(StatusCode.UNAUTHORIZED, "Incorrect password");
  }
  console.log(`usernmae: ${user.username}`);

  const token = await generateAccessToken(user.username);

  await authUtil.setCookie(res, token);

  return token;
};
