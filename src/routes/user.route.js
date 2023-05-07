const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user.controller");

// userRouter.get("/", userController.allUsers);

userRouter.get("/:id", userController.user);

userRouter.get("/:id/blogs", userController.allBlogs);

module.exports = userRouter;
