const user = require("../models/user.model");

exports.getUserById = async (user_id) => {
  return await user.findOne({ where: { user_id } });
};
