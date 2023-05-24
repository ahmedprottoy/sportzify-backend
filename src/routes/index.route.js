const express = require("express");

const blogRouter = require("./blog.route");
const userRouter = require("./user.route");
const authRouter = require("./auth.route");

/**
 * Express router for the index routes
 * @module indexRoutes
 */

const indexRouter = express.Router();

indexRouter.use("/v1/blogs", blogRouter);
indexRouter.use("/v1/users", userRouter);
indexRouter.use("/v1/auth", authRouter);

module.exports = indexRouter;
