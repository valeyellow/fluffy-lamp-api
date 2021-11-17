const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    commentContent: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const CommentModel = mongoose.model("Comment", commentSchema);

module.exports = CommentModel;
