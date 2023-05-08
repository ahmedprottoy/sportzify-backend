const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user.controller");
const { profileUpdate } = require("../validators/user.validator");
const { validate } = require("../validators/validation");
const { checkToken } = require("../middlewares/auth.middleware");

// userRouter.get("/", userController.allUsers);

userRouter
  .route("/:id")
  .get(userController.user)
  .put(checkToken, profileUpdate, validate, userController.updateUser);

userRouter.get("/:id/blogs", userController.allBlogs);

module.exports = userRouter;
