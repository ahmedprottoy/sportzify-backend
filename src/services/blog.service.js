const StatusCode = require("../utils/Objects/StatusCode");
const AppError = require("../utils/AppError");
const authUtil = require("../utils/auth.util");
// const {
//   createBlog,
//   getAllBlogs,
//   getBlogById,
//   updateBlog,
//   deleteBlog,
// } = require("../repositories/blog.repo");
const userRepo = require("../repositories/user.repo");
const blogRepo = require("../repositories/blog.repo");
const blogDto = require("../dtos/blog.dto");

exports.createBlog = async (
  username,
  title,
  content,
  imageUrl,
  imagePublicId
) => {
  const newBlog = await blogRepo.createBlog(
    username,
    title,
    content,
    imageUrl,
    imagePublicId
  );

  return new blogDto(newBlog);
};

exports.getAllBlogs = async () => {
  const blogs = await blogRepo.getAllBlogs();
  return blogs.map((blog) => new blogDto(blog));
};

exports.getBlogById = async (id) => {
  const blog = await blogRepo.getBlogById(id);
  return new blogDto(blog);
};

exports.updateBlog = async (blogId, modifiedBody) => {
  const blog = await blogRepo.getBlogById(blogId);

  if (!blog) {
    throw new AppError(StatusCode.NOT_FOUND, "No blog found with this id");
  }

  await blogRepo.updateBlog(blogId, modifiedBody);

  const updatedBlog = await blogRepo.getBlogById(blogId);

  return new blogDto(updatedBlog);
};

exports.deleteBlog = async (username, blogId) => {
  const blog = await blogRepo.getBlogById(blogId);
  const userId = await userRepo.getUserIdByUsername(username);

  if (!blog) {
    throw new AppError(StatusCode.NOT_FOUND, "No blog found with this id");
  }

  const imagePublicId = blog.imagePublicId;

  if (blog.user_id !== userId) {
    throw new AppError(
      StatusCode.UNAUTHORIZED,
      "You are not authorized to delete this blog"
    );
  }

  await blogRepo.deleteBlog(blogId);
  await authUtil.deleteImage(imagePublicId);
};
