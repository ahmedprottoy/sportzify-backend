const user = require("../models/user.model");

/**
 * Get a user by email
 * @async
 * @function
 * @name getUserByEmail
 * @memberof module:authRepo
 * @param {string} email - User email
 * @returns {Promise<object>} - User object
 */
exports.getUserByEmail = async (email) => {
  return await user.findOne({ where: { email } });
};

/**
 * Get a user by username
 * @async
 * @function
 * @name getUserByUsername
 * @memberof module:authRepo
 * @param {string} username - User username
 * @returns {Promise<object>} - User object
 */
exports.getUserByUsername = async (username) => {
  return await user.findOne({ where: { username } });
};

/**
 * Create a new user
 * @async
 * @function
 * @name createUser
 * @memberof module:authRepo
 * @param {Object} userObj - User object
 * @param {string} userObj.user_id - User ID
 * @param {string} userObj.username - User username
 * @param {string} userObj.email - User email
 * @param {string} userObj.fullname - User full name
 * @param {string} userObj.password - User password
 * @returns {Promise<object>} - Created user object
 */
exports.createUser = async ({
  user_id,
  username,
  email,
  fullname,
  password,
}) => {
  console.log("hitting create user");
  const User = await user.create({
    user_id,
    username,
    email,
    fullname,
    password,
  });

  return User;
};

/**
 * Represents a module for user-related operations.
 * @module authRepo
 */
