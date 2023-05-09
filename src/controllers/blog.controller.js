const catchAsync = require("../middlewares/catchAsync");
const AppError = require("../utils/AppError");
const blogService = require("../services/blog.service");

exports.createBlog = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const { title, content } = req.body;

  const blog = await blogService.createBlog(userId, title, content);

  res.status(201).json(blog);
});

exports.allBlogs = async (req, res) => {
  const blogs = await blogService.getAllBlogs();

  res.status(200).json(blogs);
};

exports.singleBlog = async (req, res) => {
  console.log("getting single blog of user");
};

exports.updateBlog = async (req, res) => {
  console.log("updating blogs");
};

exports.deleteBlog = async (req, res) => {
  console.log("delelting blogs on db");
};
