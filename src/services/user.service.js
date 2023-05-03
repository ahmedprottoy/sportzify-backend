const User = require("../models/user.model");
const bcrypt = require("bcrypt");

exports.createUser = async (
  { username, email, firstname, lastname, age, password },
  res
) => {
  let user = await User.findOne({ where: { username } });
  if (user) return res.status(405).json({ msg: "Username already taken" });

  //throw new AppError("Username Already Exist!", 405);

  user = await User.findOne({ where: { email } });
  if (user) return res.status(405).json({ msg: "Email already taken" });
  //throw new AppError("Email Already Exist!", 405);

  const salt = await bcrypt.genSalt(10);

  const hashedpassword = await bcrypt.hash(password, salt);
  user = await User.create({
    username,
    email,
    firstname,
    lastname,
    age,
    password: hashedpassword,
  });
  return res.status(200).json({ msg: "User created" });
};
