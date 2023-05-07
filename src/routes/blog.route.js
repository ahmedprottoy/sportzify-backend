const express = require("express");
const blogRouter = express.Router();

const blogController = require("../controllers/blog.controller");

blogRouter
  .route("/")
  .get(blogController.allBlogs)
  .post(blogController.createBlog);

blogRouter
  .route("/:id")
  .get(blogController.singleBlog)
  .patch(blogController.updateBlog)
  .delete(blogController.deleteBlog);

module.exports = blogRouter;
