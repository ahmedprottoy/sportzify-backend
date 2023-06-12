const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/**
 * Generates an access token using the provided username.
 * @async
 * @function
 * @name generateAccessToken
 * @memberof module:jwtUtil
 * @param {string} username - The username to be used in the token.
 * @returns {Promise<string>} A promise that resolves with the generated token.
 * @see generateAccessToken
 */ 
exports.generateAccessToken = async (username) => {
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};


/**
 * Verifies the provided token.
 * @async
 * @function
 * @name verifyAccessToken
 * @memberof module:jwtUtil
 * @param {string} token - The token to be verified.
 * @returns {Promise<Object>} A promise that resolves with the decoded token.
 * @see verifyAccessToken
 */ 
exports.verifyAccessToken = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

/**
 * Gets the cookie from the request.
 * @async
 * @function
 * @name getCookie
 * @memberof module:jwtUtil
 * @param {Object} req - The HTTP request object.
 * @returns {Promise<string>} A promise that resolves with the cookie.
 * @see getCookie
 */

exports.getCookie = async (req) => {
  return req.cookies.authorization || req.headers.authorization;
};

/**
 * module for handling jwt related utilities.
 * @module jwtUtil 
 */

