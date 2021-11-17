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

const findUser = async (query) => {
  try {
    return UserModel.findOne(query);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  createUser,
  findUser,
};
