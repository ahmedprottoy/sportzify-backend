const User = require("../models/user.model");
const Blog = require("../models/blog.model");

exports.createBlog = async (
  username,
  title,
  content,
  imageUrl,
  imagePublicId
) => {
  const user = await User.findOne({ where: { username } });

  const blog = await Blog.create({
    title,
    content,
    imageUrl,
    imagePublicId,
    user_id: user.user_id,
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  });
  blog.User = { username: user.username };
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
