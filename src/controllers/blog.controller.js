const catchAsync = require("../middlewares/catchAsync");
const AppError = require("../utils/AppError");
const blogService = require("../services/blog.service");
const sendResponse = require("../utils/response.util");
const StatusCode = require("../utils/Objects/StatusCode");

exports.createBlog = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const { title, content } = req.body;
  const imageUrl = req.file.url;
  const imagePublicId = req.file.public_id;

  const blog = await blogService.createBlog(
    userId,
    title,
    content,
    imageUrl,
    imagePublicId
  );
  sendResponse(req, res, StatusCode.CREATED, "Blog created successfully", blog);
});

exports.allBlogs = catchAsync(async (req, res) => {
  const blogs = await blogService.getAllBlogs();
  sendResponse(req, res, StatusCode.OK, "Blogs fetched successfully", blogs);
});

exports.singleBlog = catchAsync(async (req, res) => {
  const blog = await blogService.getBlogById(req.params.id);
  if (!blog) {
    throw new AppError("No blog found with this id", 404);
  }
  sendResponse(req, res, StatusCode.OK, "Blog fetched successfully", blog);
});

exports.updateBlog = catchAsync(async (req, res) => {
  const blogId = req.params.id;
  const modifiedBody = req.body;
  const blog = await blogService.updateBlog(blogId, modifiedBody);
  sendResponse(req, res, StatusCode.OK, "Blog updated successfully", blog);
});

exports.deleteBlog = catchAsync(async (req, res) => {
  const blogId = req.params.id;
  const userId = req.user.userId;
  await blogService.deleteBlog(userId, blogId);
  sendResponse(req, res, StatusCode.OK, "Blog deleted successfully");
});
