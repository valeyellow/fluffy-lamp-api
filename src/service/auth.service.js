const logger = require("../utils/logger");
const EmailModel = require("../models/email.model");
const OtpModel = require("../models/otp.model");

const createEmail = async (input) => {
  try {
    return EmailModel.create(input);
  } catch (e) {
    logger.error(e);
    throw new Error(e);
  }
};

const findEmail = async (query) => {
  try {
    return EmailModel.findOne(query);
  } catch (e) {
    logger.error(e);
    throw new Error(e);
  }
};

const createOtpDocument = async (input) => {
  try {
    return OtpModel.create(input);
  } catch (e) {
    logger.error(e);
    throw new Error(e);
  }
};

const findOtpDocument = async (query) => {
  try {
    return OtpModel.findOne(query);
  } catch (e) {
    logger.error(e);
    throw new Error(e);
  }
};

const updateEmail = async (query, update) => {
  try {
    return EmailModel.findOneAndUpdate(query, update);
  } catch (e) {
    logger.error(e);
    throw new Error(e);
  }
};

const removeVerifiedOtp = async (query) => {
  try {
    return OtpModel.deleteOne(query);
  } catch (e) {
    logger.error(e);
    throw new Error(e);
  }
};

module.exports = {
  createEmail,
  findEmail,
  createOtpDocument,
  findOtpDocument,
  updateEmail,
  removeVerifiedOtp,
};
