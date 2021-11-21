// initialize express app and export it as a module to be used as a single instance throughout the app
const express = require("express");

const app = express();
app.use(express.json());

module.exports = app;
