const express = require("express");
const userController = require("../controllers/user.controller");
const {
  profileUpdate,
  passwordUpdate,
} = require("../validators/user.validator");
const { validate } = require("../validators/validation");
const { checkToken } = require("../middlewares/auth.middleware");

const userRouter = express.Router();

// userRouter.get("/", userController.allUsers);

userRouter
  .route("/:id")
  .get(userController.user)
  .put(checkToken, profileUpdate, validate, userController.updateUser);

userRouter
  .route("/:id/password")
  .put(checkToken, passwordUpdate, validate, userController.passwordUpdate);

userRouter.get("/:id/blogs", userController.allBlogs);

module.exports = userRouter;
