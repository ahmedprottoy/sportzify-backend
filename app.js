const express = require("express");
const indexRouter = require("./src/routes/index.route");
const cookieParser = require("cookie-parser");
const errorHandler = require("./src/middlewares/errorHandler");
const association = require("./src/associations/association");

const app = express();

app.use(express.json());

//cookieParser,cors,morgan
// app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use("/api", indexRouter);

app.use(errorHandler);

module.exports = app;
