const express = require("express");
const authController = require("../controllers/auth.controller");
const authValidator = require("../validators/auth.validator");
const { validate } = require("../validators/validation");
const { checkToken } = require("../middlewares/auth.middleware");

const authRouter = express.Router();

authRouter.post(
  "/sign-up",
  authValidator.signUp,
  validate,
  authController.signUp
);

authRouter.post(
  "/sign-in",
  authValidator.signIn,
  validate,
  authController.signIn
);

authRouter.get("/sign-out", checkToken, authController.signOut);

module.exports = authRouter;
