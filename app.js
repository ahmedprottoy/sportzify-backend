const express = require("express");
const indexRouter = require("./src/routes/index.route");

const app = express();

app.use(express.json());

//cookieParser,cors,morgan

app.use("/api", indexRouter);

module.exports = app;
