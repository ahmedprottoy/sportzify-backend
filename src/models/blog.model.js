const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");
const User = require("./user.model");

const Blog = sequelize.define(
  "Blog",
  {
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

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

module.exports = Blog;
