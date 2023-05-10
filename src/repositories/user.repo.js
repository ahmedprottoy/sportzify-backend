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
  console.log(user_id);

  const blogs = await Blog.findAll({ where: { user_id: user_id } });
  console.log(blogs);
  return blogs;
};
