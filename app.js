const express = require("express");
const indexRouter = require("./src/routes/index.route");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());

//cookieParser,cors,morgan
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", indexRouter);

module.exports = app;
