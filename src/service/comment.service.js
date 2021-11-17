const CommentModel = require("../models/comment.model");
const logger = require("../utils/logger");

const createComment = async (input) => {
  try {
    return CommentModel.create(input);
  } catch (e) {
    logger.error(e);
    throw new Error(e);
  }
};

const deleteCommentByPostId = async (query) => {
  try {
    return CommentModel.deleteMany(query);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  createComment,
  deleteCommentByPostId,
};
