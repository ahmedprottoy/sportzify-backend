const User = require("../models/user.model");
const Blog = require("../models/blog.model");

/**
 * Create a new blog
 * @async
 * @function
 * @name createBlog
 * @memberof module:blogRepo
 * @param {string} username - Username of the user creating the blog
 * @param {string} title - Blog title
 * @param {string} content - Blog content
 * @param {string} imageUrl - URL of the blog image
 * @param {string} imagePublicId - Public ID of the blog image
 * @returns {Promise<object>} - Created blog object
 */
exports.createBlog = async (
  username,
  title,
  content,
  imageUrl,
  imagePublicId
) => {
  const user = await User.findOne({ where: { username } });

  const blog = await Blog.create({
    title,
    content,
    imageUrl,
    imagePublicId,
    user_id: user.user_id,
  });
  await blog.reload({
    include: [
      {
        model: User,

        attributes: ["username"],
      },
    ],
  });

  return blog;
};

/**
 * Get all blogs
 * @async
 * @function
 * @name getAllBlogs
 * @memberof module:blogRepo
 * @returns {Promise<Array>} - Array of blog objects
 */
exports.getAllBlogs = async () => {
  const blogs = await Blog.findAll({
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  });

  return blogs;
};

/**
 * Get a blog by ID
 * @async
 * @function
 * @name getBlogById
 * @memberof module:blogRepo
 * @param {number} id - Blog ID
 * @returns {Promise<object>} - Blog object
 */
exports.getBlogById = async (id) => {
  const blog = await Blog.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  });

  return blog;
};

/**
 * Update a blog
 * @async
 * @function
 * @name updateBlog
 * @memberof module:blogRepo
 * @param {number} blogId - Blog ID
 * @param {Object} modifiedBody - Modified blog data
 * @returns {Promise<void>}
 */
exports.updateBlog = async (blogId, modifiedBody) => {
  
  await Blog.update(modifiedBody, {
    where: { blog_id: blogId },
  });
};

/**
 * Delete a blog
 * @async
 * @function
 * @name deleteBlog
 * @memberof module:blogRepo
 * @param {number} blogId - Blog ID
 * @returns {Promise<void>}
 */
exports.deleteBlog = async (blogId) => {
  await Blog.destroy({
    where: { blog_id: blogId },
  });
};

/**
 * Represents a module for blog-related operations.
 * @module blogRepo
 */
