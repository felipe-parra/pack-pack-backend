const express = require("express");

const routes = require("./routes");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/favicon.ico", express.static("images/favicon.ico"));

app.use("/api", routes);

module.exports = app;
