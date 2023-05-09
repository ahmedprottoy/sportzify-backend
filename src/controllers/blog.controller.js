const catchAsync = require("../middlewares/catchAsync");
const AppError = require("../utils/AppError");
const blogService = require("../services/blog.service");

exports.createBlog = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const { title, content } = req.body;

  const blog = await blogService.createBlog(userId, title, content);

  res.status(201).json(blog);
});

exports.allBlogs = catchAsync(async (req, res) => {
  const blogs = await blogService.getAllBlogs();

  res.status(200).json(blogs);
});

exports.singleBlog = catchAsync(async (req, res) => {
  const blog = await blogService.getBlogById(req.params.id);

  if (!blog) {
    throw new AppError("No blog found with this id", 404);
  }

  res.status(200).json(blog);
});

exports.updateBlog = catchAsync(async (req, res) => {
  // const userId = req.user.userId;
  const blogId = req.params.id;
  const modifiedBody = req.body;

  const blog = await blogService.updateBlog(blogId, modifiedBody);

  // const blog = await blogService.updateBlog(
});

exports.deleteBlog = async (req, res) => {
  console.log("delelting blogs on db");
};
