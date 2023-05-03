const AppError = require("../utils/AppError");

const { hashPassword } = require("../utils/HashPassword");
const StatusCode = require("../utils/Objects/StatusCode");
const {
  getUserByEmail,
  getUserByUsername,
  createUser,
} = require("../repositories/auth.repo");

exports.createUser = async ({
  username,
  email,
  firstname,
  lastname,
  age,
  password,
}) => {
  if (await getUserByEmail(email)) {
    throw new AppError(StatusCode.CONFLICT, "Email already exists");
  }

  if (await getUserByUsername(username)) {
    throw new AppError(StatusCode.CONFLICT, "Username already exists");
  }

  const hashedPassword = await hashPassword(password);

  const User = await createUser({
    username,
    password: hashedPassword,
    email,
    firstname,
    lastname,
    age,
  });

  return User;
};
