const express = require("express");

const blogRouter = require("./blog.route");
const userRouter = require("./user.route");
const authRouter = require("./auth.route");

const indexRouter = express.Router();

indexRouter.use("/v1/blogs", blogRouter);
indexRouter.use("/v1/users", userRouter);
indexRouter.use("/v1/auth", authRouter);

module.exports = indexRouter;
