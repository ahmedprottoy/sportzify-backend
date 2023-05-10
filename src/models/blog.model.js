const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");
const User = require("./user.model");

const Blog = sequelize.define(
  "Blog",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

User.hasMany(Blog, {
  foreignKey: { name: "user_id", allowNull: false },
  onDelete: "CASCADE",
});
Blog.belongsTo(User, {
  foreignKey: { name: "user_id", allowNull: false },
  onDelete: "CASCADE",
});

module.exports = Blog;
