const express = require("express");
const userController = require("../controllers/user.controller");
const userValidator = require("../validators/user.validator");
const { validate } = require("../validators/validation");
const { checkToken } = require("../middlewares/auth.middleware");
const fileUpload = require("../middlewares/fileUpload.middleware");
const upload = require("../config/multer.config");
const catchAsync = require("../middlewares/catchAsync");
const userRouter = express.Router();

/**
 * Express router for blog routes
 * @module userRoutes
 */


/**
 * Route for getting user's info, updating user's profile and delete a user.
 * @name /:username
 * @function
 * @memberof module:userRoutes
 * @param {string} path - Express route path
 * @param {Function} controller - Express controller function
 * @param {Function} middleware - Express middleware function
 * @param {Function} validation - Express validation middleware function
 */


userRouter
  .route("/:username")
  .get(catchAsync(userController.user))
  .put(
    checkToken,
    userValidator.profileUpdate,
    validate,
    catchAsync(userController.updateUser)
  )
  .delete(checkToken, catchAsync(userController.deleteUser));


/**
 * Route for getting user's password, updating user's password.
 * @name /password/:username
 * @function
 * @memberof module:userRoutes
 * @param {string} path - Express route path
 * @param {Function} controller - Express controller function
 * @param {Function} middleware - Express middleware function
 * @param {Function} validation - Express validation middleware function
 */
userRouter
  .route("/password/:username")
  .put(
    checkToken,
    userValidator.passwordUpdate,
    validate,
   catchAsync (userController.passwordUpdate)
  );


/**
 * Route for getting user's blogs.
 * @name /blogs/:username
 * @function
 * @memberof module:userRoutes
 * @param {string} path - Express route path
 * @param {Function} controller - Express controller function
 * @param {Function} middleware - Express middleware function
 * @param {Function} validation - Express validation middleware function
 */
 
userRouter.route("/blogs/:username").get(catchAsync(userController.allBlogs));


/**
 * Route for getting user's image, updating user's image and delete a user's image.
 * @name /image/:username
 * @function
 * @memberof module:userRoutes
 * @param {string} path - Express route path
 * @param {Function} controller - Express controller function
 * @param {Function} middleware - Express middleware function
 * @param {Function} validation - Express validation middleware function
 * @param {Function} uploadMiddleware - Express upload middleware function
 */
userRouter
  .route("/image/:username")
  .post(
    checkToken,
    upload.single("image"),
    fileUpload.uploadImage,
    catchAsync(userController.updateImage)
  )
  .delete(checkToken, catchAsync(userController.deleteUserImage));

module.exports = userRouter;
