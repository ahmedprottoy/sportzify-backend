const express = require("express");
const authController = require("../controllers/auth.controller");
const authValidator = require("../validators/auth.validator");
const { validate } = require("../validators/validation");
const { checkToken, isLoggedIn } = require("../middlewares/auth.middleware");

const authRouter = express.Router();

authRouter.post(
  "/sign-up",
  isLoggedIn,
  authValidator.signUp,
  validate,
  authController.signUp
);

authRouter.post(
  "/sign-in",
  isLoggedIn,
  authValidator.signIn,
  validate,
  authController.signIn
);

authRouter.get("/sign-out", checkToken, authController.signOut);

module.exports = authRouter;
