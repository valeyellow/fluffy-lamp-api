const { object, string } = require("zod");

const payload = {
  body: object({
    commentContent: string({ required_error: "Comment content is required" }),
  }),
};

const params = {
  params: object({
    postId: string({
      required_error: "Post ID is required",
    }),
  }),
};

const createCommentSchema = object({
  ...payload,
  ...params,
});

const readCommentSchema = object({
  ...params,
});

module.exports = {
  createCommentSchema,
  readCommentSchema,
};
