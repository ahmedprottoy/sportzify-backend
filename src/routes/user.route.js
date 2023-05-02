const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get("/",userController.allUsers);
router.get('/:id',userController.user);
router.get('/:id/blogs',userController.allBlogs)

module.exports = router;
