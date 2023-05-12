const Sequelize = require("sequelize");

const dotenv = require("dotenv");
dotenv.config();

const db_url = process.env.DATABASE_URL;

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
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error(
      "Unable to connect or synchronize to the database:",
      error.message
    );
  }
})();

module.exports = sequelize;
