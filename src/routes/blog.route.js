const express = require("express");
const blogRouter = express.Router();
const { checkToken } = require("../middlewares/auth.middleware");
const blogController = require("../controllers/blog.controller");

// blogRouter.use(checkToken);

blogRouter
  .route("/")
  .get(blogController.allBlogs)
  .post(checkToken, blogController.createBlog);

blogRouter
  .route("/:id")
  .get(checkToken, blogController.singleBlog)
  .patch(checkToken, blogController.updateBlog)
  .delete(checkToken, blogController.deleteBlog);

module.exports = blogRouter;
