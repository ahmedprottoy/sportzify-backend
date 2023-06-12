const {sequelize} = require("../config/db.config");
const { DataTypes } = require("sequelize");
const User = require("./user.model");



/**
 * Represents the Blog model in the database.
 
 * @memberof module:blogModel
 * @property {number} blog_id - The unique identifier for the blog.
 * @property {string} title - The title of the blog.
 * @property {string} content - The content of the blog.
 * @property {string} imageUrl - The URL of the blog image.
 * @property {string} imagePublicId - The public ID of the blog image.
 * @property {Date} createdAt - The timestamp of when the blog was created.
 * @property {Date} updatedAt - The timestamp of when the blog was last updated.
 */

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
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
        notEmpty: true,
      },
    },
    imagePublicId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);



module.exports = Blog;
/**
 * Represents the Blog model in the database.
 * @module blogModel
 */