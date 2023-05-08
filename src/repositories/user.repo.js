const user = require("../models/user.model");

exports.getUserById = async (user_id) => {
  return await user.findOne({ where: { user_id } });
};

exports.updateUser = async (user_id, updateBody) => {
  var updatedUser = await user.update(updateBody, { where: { user_id } });

  return updatedUser;
};
