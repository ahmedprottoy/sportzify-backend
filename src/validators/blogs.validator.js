const { body } = require("express-validator");

exports.createBlog = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long")
    .isLength({ max: 150 })
    .withMessage("Title must be at most 150 characters long"),

  body("content").trim().notEmpty().withMessage("Content is required"),
];

exports.updateBlog = [
  body("title")
    .trim()

    .isLength({ max: 150 })
    .withMessage("Title must be at most 150 characters long"),
];
