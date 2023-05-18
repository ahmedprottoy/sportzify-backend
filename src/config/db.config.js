/**
 * @namespace sequelizeModule
 * @desc A module for configuring and exporting the Sequelize instance.
 */
const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const db_url = process.env.DATABASE_URL;

/**
 * The Sequelize instance for connecting to the database.
 * @type {Sequelize}
 */
const sequelize = new Sequelize(db_url, {
  logging: false,
  define: {
    timestamps: true,
    paranoid: false,
    freezeTableName: true,
  },
  dialect: "mysql",
});

// Test the database connection
const connectDatabase = async () => {
  try {
    /**
     * Authenticates the database connection.
     * @function
     * @name authenticate
     * @memberof sequelizeModule
     * @returns {Promise<void>} A promise that resolves when the connection is established.
     */
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    /**
     * Synchronizes all defined models with the database.
     * @function
     * @name syncModels
     * @memberof sequelizeModule
     * @returns {Promise<void>} A promise that resolves when the synchronization is completed.
     */
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error(
      "Unable to connect or synchronize to the database:",
      error.message
    );
  }
};
// Exported module
module.exports = {
  connectDatabase,
  sequelize,
};
