const User = require("../models/user.model");
const Blog = require("../models/blog.model");

exports.createBlog = async (userId, title, content) => {
  const user = await User.findByPk(userId);

  const blog = await Blog.create({
    title,
    content,
    user_id: userId,
  });

  return {
    id: blog.blog_id,
    title: blog.title,
    content: blog.content,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
    auther: {
      name: user.username,
    },
  };
};
