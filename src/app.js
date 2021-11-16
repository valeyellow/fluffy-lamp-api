const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");

const log = require("./utils/logger");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

dotenv.config();

const port = process.env.PORT || 8080;

app.get("/healthcheck", async (req, res) => {
  res.send("Connection successful!");
});

app.listen(port, async () => {
  log.info(`App is listening on port ${port}`);
});
