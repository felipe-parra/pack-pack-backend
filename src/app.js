const express = require("express");

const path = require("path");

const favicon = require("serve-favicon");

const cors = require("cors");

const config = require("./config");

const routes = require("./routes");

const logger = require("morgan");

const { verifyAppToken } = require("./middlewares/verifyAppToken");

require("./database");

const app = express();
app.use(logger("dev"));
app.use(cors("*"));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(favicon(path.join(__dirname, "images", "favicon.ico")));

app.use(`/api/${config.versionApi}/`, verifyAppToken, routes);

module.exports = app;
