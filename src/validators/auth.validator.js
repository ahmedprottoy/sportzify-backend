const { body } = require("express-validator");

const signUp = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .isLength({ max: 20 })
    .withMessage("Username must be at most 20 characters long"),

  body("password")
    .trim()
    .isStrongPassword()
    .withMessage(
      "Password should have at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
    ),

  body("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  body("firstname")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Firstname must be at least 3 characters long")
    .isLength({ max: 20 })
    .withMessage("Firstname must be at most 20 characters long"),

  body("lastname")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Lastname must be at least 3 characters long")
    .isLength({ max: 20 })
    .withMessage("Lastname must be at most 20 characters long"),

  body("age")
    .trim()
    .isInt({ min: 18 })
    .withMessage("Age must be at least 18 years old")
    .isInt({ max: 100 })
    .withMessage("Age must be at most 100 years old"),
];

export const authValidator = {
  signUp,
};
