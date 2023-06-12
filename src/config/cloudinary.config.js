/**
 * @namespace cloudinaryModule
 * @desc A module for configuring and exporting the Cloudinary instance.
 */

const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

/**
 * Configures the Cloudinary instance with the provided environment variables.
 * @function
 * @name configureCloudinary
 * @memberof cloudinaryModule
 * @param {object} options - Configuration options for Cloudinary.
 * @param {string} options.cloud_name - The Cloudinary cloud name.
 * @param {string} options.api_key - The Cloudinary API key.
 * @param {string} options.api_secret - The Cloudinary API secret.
 */
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Exported module
module.exports = cloudinary;
