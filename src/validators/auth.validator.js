const { body } = require("express-validator");

/**
 * Validates the request body for the signUp route.
 * @name signUp
 * @memberof module:authValidator
 */

exports.signUp = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .isLength({ max: 20 })
    .withMessage("Username must be at most 20 characters long"),

  body("password")
    .trim()
    .isStrongPassword()
    .withMessage(
      "Password should have at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
    ),

  body("fullname")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Fullname must be at least 3 characters long")
    .isLength({ max: 20 })
    .withMessage("Fullname must be at most 20 characters long"),
];


/**
 * Validates the request body for the signIn route.
 * @name signIn
 * @memberof module:authValidator
 */
exports.signIn = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
];


/**
 * Validates the request body for the sign-in and sign-up routes.
 * @module authValidator
 * @requires express-validator
 */