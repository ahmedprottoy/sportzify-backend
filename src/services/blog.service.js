const StatusCode = require("../utils/Objects/StatusCode");
const AppError = require("../utils/AppError");
const authUtil = require("../utils/auth.util");
const userRepo = require("../repositories/user.repo");
const blogRepo = require("../repositories/blog.repo");
const blogDto = require("../dtos/blog.dto");

/**
 * Creates a new blog with the provided details.
 * @async
 * @function
 * @name createBlog
 * @memberof module:blogService
 * @param {string} username - The username of the blog author.
 * @param {string} title - The title of the blog.
 * @param {string} content - The content of the blog.
 * @param {string} imageUrl - The URL of the blog image.
 * @param {string} imagePublicId - The public ID of the blog image.
 * @returns {Promise<blogDto>} A promise that resolves with the created blog DTO.
 */
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
  // console.log(newBlog)

  return new blogDto(newBlog);
};

/**
 * Retrieves all blogs.
 * @async
 * @function
 * @name getAllBlogs
 * @memberof module:blogService
 * @returns {Promise<blogDto[]>} A promise that resolves with an array of blog DTOs.
 */
exports.getAllBlogs = async () => {
  const blogs = await blogRepo.getAllBlogs();
  return blogs.map((blog) => new blogDto(blog));
  // return blogs;
};

/**
 * Retrieves a blog by its ID.
 * @async
 * @function
 * @name getBlogById
 * @memberof module:blogService
 * @param {string} id - The ID of the blog.
 * @returns {Promise<blogDto>} A promise that resolves with the blog DTO.
 */
exports.getBlogById = async (id) => {
  const blog = await blogRepo.getBlogById(id);
  if (!blog) {
    throw new AppError(StatusCode.NOT_FOUND, "No blog found with this id");
  }
  return new blogDto(blog);
};

/**
 * Updates a blog with the provided modified body.
 * @async
 * @function
 * @name updateBlog
 * @memberof module:blogService
 * @param {string} blogId - The ID of the blog to update.
 * @param {Object} modifiedBody - The modified blog data.
 * @returns {Promise<blogDto>} A promise that resolves with the updated blog DTO.
 * @throws {AppError} If no blog is found with the provided ID.
 */
exports.updateBlog = async (blogId, modifiedBody) => {
  const blog = await blogRepo.getBlogById(blogId);

  if (!blog) {
    throw new AppError(StatusCode.NOT_FOUND, "No blog found with this id");
  }

  await blogRepo.updateBlog(blogId, modifiedBody);

  const updatedBlog = await blogRepo.getBlogById(blogId);

  return new blogDto(updatedBlog);
};

/**
 * Deletes a blog with the provided ID and author's username.
 * @async
 * @function
 * @name deleteBlog
 * @memberof module:blogService
 * @param {string} username - The username of the blog author.
 * @param {string} blogId - The ID of the blog to delete.
 * @returns {Promise<void>} A promise that resolves when the blog is deleted.
 * @throws {AppError} If no blog is found with the provided ID or the user is not authorized to delete the blog.
 */
exports.deleteBlog = async (username, blogId) => {
  const blog = await blogRepo.getBlogById(blogId);

  if (!blog) {
    throw new AppError(StatusCode.NOT_FOUND, "No blog found with this id");
  }

  const userId = await userRepo.getUserIdByUsername(username);
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

/**
 * Represents a module for handling blog-related services.
 * @module blogService
 */
