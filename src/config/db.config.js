const Sequelize = require('sequelize');

const dotenv=require('dotenv');
dotenv.config();


const db_url = process.env.DATABASE_URL;

const sequelize = new Sequelize(db_url, {  
  logging: true,
  define: {
    timestamps: true,
    paranoid : false, 
    freezeTableName:true
  },
  dialect: 'mysql',
});


// Test the database connection
( async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
})();

// Sync the model with the database
(async () => {
  try {
    await sequelize.sync();
    console.log('All models were synchronized successfully.');

    //await sequelize.sync({force:true}); ===>"DROP ALL TABLE & CREATE NEW ONE"
    // await sequelize.sync({ alter: true });  ===> "WONT DELETE TABLE BUT WILL ALTER TABLE"
    
  } catch (error) {
    console.error('Unable to synchronize the models with the database:', error.message);
  }
})();


module.exports = sequelize;

