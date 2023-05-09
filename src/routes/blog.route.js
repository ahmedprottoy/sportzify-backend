const express = require("express");
const blogRouter = express.Router();
const { checkToken } = require("../middlewares/auth.middleware");
const blogController = require("../controllers/blog.controller");
const { createBlog, updateBlog } = require("../validators/blogs.validator");
const { validate } = require("../validators/validation");

// blogRouter.use(checkToken);

blogRouter
  .route("/")
  .get(blogController.allBlogs)
  .post(checkToken, createBlog, validate, blogController.createBlog);

blogRouter
  .route("/:id")
  .get(checkToken, blogController.singleBlog)
  .put(checkToken, blogController.updateBlog)
  .delete(checkToken, blogController.deleteBlog);

module.exports = blogRouter;
