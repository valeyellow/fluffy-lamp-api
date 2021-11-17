// import external module
const mongoose = require("mongoose");

// import internal module
const logger = require("../utils/logger");
const { deleteCommentByPostId } = require("../service/comment.service");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postContent: {
      type: String,
      required: true,
      trim: true,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

postSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
});

// when user deletes a post, delete all comments related to this post
postSchema.post("findOneAndDelete", async (deletedPost) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    await deleteCommentByPostId({ post: deletedPost._id });
  } catch (e) {
    logger.error(e);
  }
});

const PostModel = mongoose.model("Post", postSchema);

module.exports = PostModel;
