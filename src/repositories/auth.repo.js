const user = require("../models/user.model");

exports.getUserByEmail = async (email) => {
  return await user.findOne({ where: { email } });
};

exports.getUserByUsername = async (username) => {
  return await user.findOne({ where: { username } });
};

exports.getUserById = async (id) => {
  return await user.findOne({ where: { id } });
};

exports.createUser = async ({
  user_id,
  username,
  email,
  firstname,
  lastname,
  age,
  password,
}) => {
  console.log("hitting create user");
  const User = await user.create({
    user_id,
    username,
    email,
    firstname,
    lastname,
    age,
    password,
  });

  return User;
};
