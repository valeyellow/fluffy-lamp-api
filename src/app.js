// import external modules
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");

// import internal modules
const app = require("./utils/express.utils");
const logger = require("./utils/logger");
const connect = require("./utils/connect");
const routes = require("./routes");
const deserializeUser = require("./middleware/deserializeUser");

const swaggerDoc = require("./utils/swagger.utils");

// load .env variables into process.env
dotenv.config();

app.use(cors());
app.use(helmet());

app.use(deserializeUser);

const port = process.env.PORT || 8080;

/**
 * @openapi
 * /healthcheck:
 *  get:
 *     tags:
 *     - Healthcheck
 *     summary: Responds if the app is up and running
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is running
 */
app.get("/healthcheck", async (req, res) => {
  res.send("Connection successful!");
});

app.listen(port, async () => {
  logger.info(`App is listening on port ${port}`);

  // connect to db
  await connect();

  routes(app);

  swaggerDoc(port);
});
