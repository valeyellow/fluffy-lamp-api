const PostModel = require("../models/post.model");

const createPost = async (input) => {
  try {
    const post = await PostModel.create(input);
    return post;
  } catch (e) {
    throw new Error(e);
  }
};

const findPost = async (query) => {
  try {
    return PostModel.findOne(query);
  } catch (e) {
    throw new Error(e);
  }
};

const findAndUpdatePost = async (query, update, options) => {
  try {
    return PostModel.findOneAndUpdate(query, update, options);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  createPost,
  findPost,
  findAndUpdatePost,
};
