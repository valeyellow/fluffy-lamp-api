const mongoose = require("mongoose");

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

const PostModel = mongoose.model("Post", postSchema);

module.exports = PostModel;
