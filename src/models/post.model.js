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

postSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
});

postSchema.post("findOneAndDelete", async (deletedPost) => {
  console.log(
    "Inside findOneAndDelete post hook...deletedPost -->",
    deletedPost
  );
});

const PostModel = mongoose.model("Post", postSchema);

module.exports = PostModel;
