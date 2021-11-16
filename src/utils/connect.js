const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require("./logger");

dotenv.config();

const dbUri = process.env.DB_URI;

/**
 * Invokes the mongoose.connect function to establish connection to the DB
 */
const connect = async () => {
  try {
    await mongoose.connect(dbUri);
    logger.info("DB connection successful");
  } catch (error) {
    logger.error("Could not connect to DB!");
    process.exit(1);
  }
};

module.exports = connect;
