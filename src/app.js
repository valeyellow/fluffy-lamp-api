// import external modules
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");

// import internal modules

const logger = require("./utils/logger");
const connect = require("./utils/connect");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// load .env variables into process.env
dotenv.config();

const port = process.env.PORT || 8080;

app.get("/healthcheck", async (req, res) => {
  res.send("Connection successful!");
});

app.listen(port, async () => {
  logger.info(`App is listening on port ${port}`);

  // connect to db
  connect();
});
