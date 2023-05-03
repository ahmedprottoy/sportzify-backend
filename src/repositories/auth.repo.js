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
  username,
  email,
  firstname,
  lastname,
  age,
  password,
}) => {
  const User = await user.create({
    username,
    email,
    firstname,
    lastname,
    age,
    password,
  });

  return User;
};
