const { body } = require("express-validator");

/**
 * Validates the request body for the createBlog route.
 * @name createBlog
 * @memberof module:blogsValidator
 * @see createBlog
 */

exports.createBlog = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),
  body("content").trim().notEmpty().withMessage("Content is required"),
];

/**
 * Validates the request body for the updateBlog route.
 * @name updateBlog
 * @memberof module:blogsValidator
 * @see updateBlog
 */
exports.updateBlog = [
  body("title")
    .trim()

    .isLength({ max: 150 })
    .withMessage("Title must be at most 150 characters long"),
];

/**
 * Validates the request body for the createBlog and updateBlog routes.
 * @module blogsValidator
 * @requires express-validator
 */
