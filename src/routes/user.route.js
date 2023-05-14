const express = require("express");
const userController = require("../controllers/user.controller");
const userValidator = require("../validators/user.validator");
const { validate } = require("../validators/validation");
const { checkToken } = require("../middlewares/auth.middleware");
const fileUpload = require("../middlewares/fileUpload.middleware");
const upload = require("../config/multer.config");
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
  .get(userController.user)
  .put(
    checkToken,
    userValidator.profileUpdate,
    validate,
    userController.updateUser
  )
  .delete(checkToken, userController.deleteUser);


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
    userController.passwordUpdate
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
 
userRouter.route("/blogs/:username").get(userController.allBlogs);


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
    userController.updateImage
  )
  .delete(checkToken, userController.deleteUserImage);

module.exports = userRouter;
