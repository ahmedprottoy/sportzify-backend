const User = require("../models/user.model");
const Blog = require("../models/blog.model");

/**
 * Get the user ID by username
 * @async
 * @function
 * @name getUserIdByUsername
 * @memberof module:userRepo
 * @param {string} username - Username of the user
 * @returns {Promise<number>} - User ID
 */
exports.getUserIdByUsername = async (username) => {
  const user = await User.findOne({ where: { username } });
  return user.user_id;
};

/**
 * Get a user by ID
 * @async
 * @function
 * @name getUserById
 * @memberof module:userRepo
 * @param {number} user_id - User ID
 * @returns {Promise<object>} - User object
 */
exports.getUserById = async (user_id) => {
  return await User.findOne({ where: { user_id } });
};

/**
 * Update a user
 * @async
 * @function
 * @name updateUser
 * @memberof module:userRepo
 * @param {number} user_id - User ID
 * @param {Object} updateBody - Updated user data
 * @returns {Promise<number>} - Number of updated rows
 */
exports.updateUser = async (user_id, updateBody) => {
  var updatedUser = await User.update(updateBody, { where: { user_id } });

  return updatedUser;
};

/**
 * Get all blogs of a user
 * @async
 * @function
 * @name allBlogs
 * @memberof module:userRepo
 * @param {number} user_id - User ID
 * @returns {Promise<Array>} - Array of blog objects
 */
exports.allBlogs = async (user_id) => {
  const blogs = await Blog.findAll({
    where: { user_id },
    include: { model: User, attributes: ["username"] },
  });
  return blogs;
};

/**
 * Delete a user
 * @async
 * @function
 * @name deleteUser
 * @memberof module:userRepo
 * @param {number} user_id - User ID
 * @returns {Promise<number>} - Number of deleted rows
 */
exports.deleteUser = async (user_id) => {
  return await User.destroy({ where: { user_id }, cascade: true });
};

/**
 * Represents a module for user-related operations.
 * @module userRepo
 */
