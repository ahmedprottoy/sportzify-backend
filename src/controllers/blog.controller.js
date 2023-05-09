const blogService = require("../services/blog.service");

exports.createBlog = async (req, res) => {
  const userId = req.user.userId;
  const { title, content } = req.body;

  const blog = await blogService.createBlog(userId, title, content);

  res.status(201).json(blog);
};

exports.allBlogs = async (req, res) => {
  console.log("getting all blogs on db");
};

exports.singleBlog = async (req, res) => {
  console.log("getting single blog of user");
};

exports.updateBlog = async (req, res) => {
  console.log("updating blogs");
};

exports.deleteBlog = async (req, res) => {
  console.log("delelting blogs on db");
};
