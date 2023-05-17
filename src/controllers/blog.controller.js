const catchAsync = require("../middlewares/catchAsync");
const AppError = require("../utils/AppError");
const blogService = require("../services/blog.service");
const sendResponse = require("../utils/response.util");
const StatusCode = require("../utils/Objects/StatusCode");

/**
 * Creates a new blog.
 * @async
 * @function
 * @name createBlog
 * @memberof module:blogController
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the blog is created.
 */
exports.createBlog = async (req, res) => {
  const username = req.user.username;
  const { title, content } = req.body;
  const imageUrl = req.file.url;
  const imagePublicId = req.file.public_id;
  const blog = await blogService.createBlog(
    username,
    title,
    content,
    imageUrl,
    imagePublicId
  );
  sendResponse(req, res, StatusCode.CREATED, "Blog created successfully", blog);
};

/**
 * Retrieves all blogs.
 * @async
 * @function
 * @name allBlogs
 * @memberof module:blogController
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves with the array of blogs.
 */
exports.allBlogs = async (req, res) => {
  const blogs = await blogService.getAllBlogs();
  sendResponse(req, res, StatusCode.OK, "Blogs fetched successfully", blogs);
};

/**
 * Retrieves a single blog by its ID.
 * @async
 * @function
 * @name singleBlog
 * @memberof module:blogController
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves with the fetched blog.
 * @throws {AppError} If no blog is found with the provided ID.
 */
exports.singleBlog = async (req, res) => {
  const blog = await blogService.getBlogById(req.params.id);
  if (!blog) {
    throw new AppError("No blog found with this id", 404);
  }
  sendResponse(req, res, StatusCode.OK, "Blog fetched successfully", blog);
};

/**
 * Updates a blog.
 * @async
 * @function
 * @name updateBlog
 * @memberof module:blogController
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves with the updated blog.
 */
exports.updateBlog = async (req, res) => {
  const blogId = req.params.id;
  const modifiedBody = req.body;
  const blog = await blogService.updateBlog(blogId, modifiedBody);
  sendResponse(req, res, StatusCode.OK, "Blog updated successfully", blog);
};

/**
 * Deletes a blog.
 * @async
 * @function
 * @name deleteBlog
 * @memberof module:blogController
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the blog is deleted.
 */
exports.deleteBlog = async (req, res) => {
  const blogId = req.params.id;
  const username = req.user.username;
  await blogService.deleteBlog(username, blogId);
  sendResponse(req, res, StatusCode.NO_CONTENT, "Blog deleted successfully");
};

/**
 * Represents a module for handling blog related operations.
 * @module blogController
 */
