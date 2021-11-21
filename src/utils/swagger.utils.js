const { version } = require("./../../package.json");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const log = require("./logger");
const app = require("./express.utils");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "fluffy-lamp-api Docs",
      version,
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
  apis: ["./../routes/*.js", "./../schema/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

function swaggerDoc(port) {
  // swagger page
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // docs in json format
  app.get("/api/docs", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  log.info(`API Docs available at http://localhost:${port}/api/docs`);
}

module.exports = swaggerDoc;
