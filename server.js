const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});
