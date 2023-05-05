const bcrypt = require("bcrypt");

exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

exports.comparePassword = async (inputPassword, hashedPassword) => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};

exports.setCookie = (res, token) => {
  res.cookie("authorization", token, {
    httpOnly: true,
    sameSite: "none",
    secure: false,
  });
};
