const express = require("express");
const blogRouter = express.Router();
const { checkToken } = require("../middlewares/auth.middleware");
const blogController = require("../controllers/blog.controller");
const blogValidator = require("../validators/blogs.validator");
const { validate } = require("../validators/validation");
const fileUpload = require("../middlewares/fileUpload.middleware");
const upload = require("../config/multer.config");

/**
 * Express router for blog routes
 * @module blogRoutes
 */

/**
 * Route for getting all blogs and creating a new blog
 * @name /
 * @function
 * @memberof module:blogRoutes
 * @param {string} path - Express route path
 * @param {Function} controller - Express controller function
 * @param {Function} middleware - Express middleware function
 * @param {Function} validation - Express validation middleware function
 * @param {Function} uploadMiddleware - Express upload middleware function
 */
blogRouter
  .route("/")
  .get(blogController.allBlogs)
  .post(
    checkToken,
    upload.single("image"),
    blogValidator.createBlog,
    validate,
    fileUpload.uploadImage,
    blogController.createBlog
  );

/**
 * Route for getting, updating, and deleting a specific blog
 * @name /:id
 * @function
 * @memberof module:blogRoutes
 * @param {string} path - Express route path
 * @param {Function} middleware - Express middleware function
 * @param {Function} controller - Express controller function
 */
blogRouter
  .route("/:id")
  .get(checkToken, blogController.singleBlog)
  .put(checkToken, blogController.updateBlog)
  .delete(checkToken, blogController.deleteBlog);

module.exports = blogRouter;
