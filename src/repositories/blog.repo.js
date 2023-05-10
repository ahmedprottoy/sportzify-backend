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
    auther: user.username,
  };
};

exports.getAllBlogs = async () => {
  const blogs = await Blog.findAll({
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  });

  return blogs;
};

exports.getBlogById = async (id) => {
  const blog = await Blog.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  });

  return blog;
};

exports.updateBlog = async (blogId, modifiedBody) => {
  await Blog.update(modifiedBody, {
    where: { blog_id: blogId },
  });
};

exports.deleteBlog = async (blogId) => {
  await Blog.destroy({
    where: { blog_id: blogId },
  });
};
