const User = require("../models/user.model");
const Blog = require("../models/blog.model");

User.hasMany(Blog, {
  foreignKey: { name: "user_id", allowNull: false },
  indexes: false,
  onDelete: "CASCADE",
});

Blog.belongsTo(User, {
  foreignKey: { name: "user_id", allowNull: false },
  indexes: false,
  onDelete: "CASCADE",
});
