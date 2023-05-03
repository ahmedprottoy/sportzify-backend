const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blog.controller');


router.route('/')
    .get(blogController.allBlogs)
    .post(blogController.createBlog)

router.route('/:id')
    .get(blogController.singleBlog)
    .patch(blogController.updateBlog)
    .delete(blogController.deleteBlog)


module.exports = router;
