const StatusCode = require("../utils/Objects/StatusCode");
const AppError = require("../utils/AppError");
const authUtil = require("../utils/auth.util");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../repositories/blog.repo");

exports.createBlog = async (userId, title, content) => {
  const newBlog = await createBlog(userId, title, content);
  return newBlog;
};

exports.getAllBlogs = async () => {
  const blogs = await getAllBlogs();
  return blogs;
};

exports.getBlogById = async (id) => {
  const blog = await getBlogById(id);
  return blog;
};

exports.updateBlog = async (blogId, modifiedBody) => {
  const blog = await getBlogById(blogId);

  if (!blog) {
    throw new AppError(StatusCode.NOT_FOUND, "No blog found with this id");
  }

  await updateBlog(blogId, modifiedBody);

  const updatedBlog = await getBlogById(blogId);

  return updatedBlog;
};

exports.deleteBlog = async (userId, blogId) => {
  const blog = await getBlogById(blogId);

  if (!blog) {
    throw new AppError(StatusCode.NOT_FOUND, "No blog found with this id");
  }

  if (blog.user_id !== userId) {
    throw new AppError(
      StatusCode.UNAUTHORIZED,
      "You are not authorized to delete this blog"
    );
  }

  await deleteBlog(blogId);
};
