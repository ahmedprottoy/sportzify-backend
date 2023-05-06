const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const authValidator = require("../validators/auth.validator");
const { validate } = require("../validators/validation");
const { checkToken } = require("../middlewares/auth.middleware");

router.post("/sign-up", authValidator.signUp, validate, authController.signUp);
router.post("/sign-in", authValidator.signIn, validate, authController.signIn);
router.get("/sign-out", checkToken, authController.signOut);

module.exports = router;
