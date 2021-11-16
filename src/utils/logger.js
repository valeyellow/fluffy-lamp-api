const logger = require("pino");
const dayjs = require("dayjs");

const transport = {
  target: "pino-pretty",
  options: { colorize: true },
};

const log = logger({
  transport,
  base: { pid: false },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

module.exports = log;
