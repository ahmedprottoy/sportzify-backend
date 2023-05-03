const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const authValidator = require("../validators/auth.validator");
const { validate } = require("../validators/validation");

router.post("/sign-up", authValidator.signUp, validate, authController.signUp);
router.post("/sign-in", authController.signIn);
router.post("/sign-out", authController.signOut);

module.exports = router;
