const AppError = require("../utils/AppError");
const uuid = require("uuid");

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
    console.log("hitting email");
    throw new AppError(StatusCode.CONFLICT, "Email already exists");
  }

  if (await getUserByUsername(username)) {
    console.log("hitting username");
    throw new AppError(StatusCode.CONFLICT, "Username already exists");
  }

  const hashedPassword = await hashPassword(password);
  const uniqueId = uuid.v4().toString();

  const User = await createUser({
    user_id: uniqueId,
    username,
    password: hashedPassword,
    email,
    firstname,
    lastname,
    age,
  });

  return User;
};
