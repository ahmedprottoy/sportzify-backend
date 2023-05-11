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
const blogDto = require("../dtos/blog.dto");

exports.createBlog = async (userId, title, content) => {
  const newBlog = await createBlog(userId, title, content);
  console.log(newBlog);
  return new blogDto(newBlog);
};

exports.getAllBlogs = async () => {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => new blogDto(blog));
};

exports.getBlogById = async (id) => {
  const blog = await getBlogById(id);
  return new blogDto(blog);
};

exports.updateBlog = async (blogId, modifiedBody) => {
  const blog = await getBlogById(blogId);

  if (!blog) {
    throw new AppError(StatusCode.NOT_FOUND, "No blog found with this id");
  }

  await updateBlog(blogId, modifiedBody);

  const updatedBlog = await getBlogById(blogId);

  return new blogDto(updatedBlog);
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
