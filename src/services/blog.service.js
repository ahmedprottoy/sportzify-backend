const StatusCode = require("../utils/Objects/StatusCode");
const AppError = require("../utils/AppError");
const authUtil = require("../utils/auth.util");
const { createBlog } = require("../repositories/blog.repo");

exports.createBlog = async (userId, title, content) => {
  const newBlog = await createBlog(userId, title, content);
  return newBlog;
};
