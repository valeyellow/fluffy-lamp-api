const UserModel = require("../models/user.model");
const logger = require("../utils/logger");

const createUser = async (userDetails) => {
  try {
    const user = await UserModel.create(userDetails);
    return user;
  } catch (e) {
    logger.error(e);
    throw new Error(e);
  }
};

module.exports = {
  createUser,
};
