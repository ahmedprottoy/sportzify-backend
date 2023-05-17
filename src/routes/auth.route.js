const express = require("express");
const authController = require("../controllers/auth.controller");
const authValidator = require("../validators/auth.validator");
const { validate } = require("../validators/validation");
const { isLoggedIn } = require("../middlewares/auth.middleware");
const catchAsync = require("../middlewares/catchAsync");

/**
 * Express router for authentication routes
 * @module authRoutes
 */

const authRouter = express.Router();

/**
 * Route for user sign-up
 * @name /sign-up
 * @function
 * @memberof module:authRoutes
 * @param {string} path - Express route path
 * @param {Function} middleware - Express middleware function
 * @param {Function} validation - Express validation middleware function
 * @param {Function} controller - Express controller function
 */
authRouter.post(
  "/sign-up",
  isLoggedIn,
  authValidator.signUp,
  validate,
  catchAsync(authController.signUp)
);

/**
 * Route for user sign-in
 * @name /sign-in
 * @function
 * @memberof module:authRoutes
 * @param {string} path - Express route path
 * @param {Function} middleware - Express middleware function
 * @param {Function} validation - Express validation middleware function
 * @param {Function} controller - Express controller function
 */
authRouter.post(
  "/sign-in",
  isLoggedIn,
  authValidator.signIn,
  validate,
  catchAsync(authController.signIn)
);

/**
 * Route for user sign-out
 * @name /sign-out
 * @function
 * @memberof module:authRoutes
 * @param {string} path - Express route path
 * @param {Function} controller - Express controller function
 */
authRouter.get("/sign-out", catchAsync(authController.signOut));

module.exports = authRouter;
