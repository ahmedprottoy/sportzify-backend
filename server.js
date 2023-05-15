require("dotenv").config();
const app = require("./app");
const { connectDatabase } = require("./src/config/db.config");

const port = process.env.SERVER_PORT;

connectDatabase();

app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});
