const User = require("../models/user.model");
const Blog = require("../models/blog.model");

exports.createBlog = async (user_id, title, content) => {
  const user = await User.findByPk(user_id);

  const blog = await Blog.create({
    title,
    content,
    user_id,
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  });
  blog.User = { username: user.username };
  console.log(blog);
  return blog;
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
