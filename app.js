require("dotenv").config();

console.log(`${process.env.PORT}`)

const express = require("express");
const app = express();

// const dotenv = require("dotenv");
// dotenv.config();

app.use(express.json());

//cookieParser,cors,morgan

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`${port} is running`);
});


