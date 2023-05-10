const user = require("../models/user.model");
const Blog = require("../models/blog.model");

exports.getUserById = async (user_id) => {
  return await user.findOne({ where: { user_id } });
};

exports.updateUser = async (user_id, updateBody) => {
  var updatedUser = await user.update(updateBody, { where: { user_id } });

  return updatedUser;
};

exports.allBlogs = async (user_id) => {
  const blogs = await Blog.findAll({ where: { user_id } });
  return blogs;
};

exports.deleteUser = async (user_id) => {
  const deletedUser = await user.destroy({ where: { user_id }, cascade: true });
  console.log(deletedUser);
};
