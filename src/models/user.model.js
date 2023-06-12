const {sequelize} = require("../config/db.config");
const { DataTypes } = require("sequelize");

/**
 * Represents the User model in the database.

 * @memberof module:userModel
 * @property {string} user_id - The unique identifier for the user.
 * @property {string} username - The username of the user.
 * @property {string} fullname - The full name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 * @property {string} imageUrl - The URL of the user's image.
 * @property {string} imagePublicId - The public ID of the user's image.
 * @property {Date} createdAt - The timestamp of when the user was created.
 * @property {Date} updatedAt - The timestamp of when the user was last updated.
 */

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
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
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = User;
/**
 * Represents the User model.
 * @module userModel
 */
