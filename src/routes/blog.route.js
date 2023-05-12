const express = require("express");
const blogRouter = express.Router();
const { checkToken } = require("../middlewares/auth.middleware");
const blogController = require("../controllers/blog.controller");
const blogValidator = require("../validators/blogs.validator");
const { validate } = require("../validators/validation");
const fileUpload = require("../middlewares/fileUpload.middleware");
const upload = require("../config/multer.config");

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

blogRouter
  .route("/:id")
  .get(checkToken, blogController.singleBlog)
  .put(checkToken, blogController.updateBlog)
  .delete(checkToken, blogController.deleteBlog);

module.exports = blogRouter;
