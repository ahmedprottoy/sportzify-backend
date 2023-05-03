const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const authValidator = require("../validators/auth.validator");

router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);
router.post("/sign-out", authController.signOut);

module.exports = router;
