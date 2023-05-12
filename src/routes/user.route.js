const express = require("express");
const userController = require("../controllers/user.controller");
const userValidator = require("../validators/user.validator");
const { validate } = require("../validators/validation");
const { checkToken } = require("../middlewares/auth.middleware");
const fileUpload = require("../middlewares/fileUpload.middleware");
const upload = require("../config/multer.config");
const userRouter = express.Router();

userRouter
  .route("/:id")
  .get(userController.user)
  .put(
    checkToken,
    userValidator.profileUpdate,
    validate,
    userController.updateUser
  )
  .delete(checkToken, userController.deleteUser);

userRouter
  .route("/password/:id")
  .put(
    checkToken,
    userValidator.passwordUpdate,
    validate,
    userController.passwordUpdate
  );

userRouter.route("/blogs/:id").get(userController.allBlogs);

userRouter
  .route("/image/:id")
  .post(
    checkToken,
    upload.single("image"),
    fileUpload.uploadImage,
    userController.updateImage
  )
  .delete(checkToken, userController.deleteUserImage);

module.exports = userRouter;
