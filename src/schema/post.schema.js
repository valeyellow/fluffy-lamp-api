const { object, string, boolean } = require("zod");

const createPostPayload = {
  body: object({
    postContent: string({
      required_error: "Post content is required",
    }).max(300, "Sorry, post length must be 300 characters or less"),
    isLiked: boolean().optional(),
  }),
};

const updatePostLikePayload = {
  body: object({
    isLiked: boolean({ required_error: "IsLiked is a required field" }),
  }),
};

const params = {
  params: object({
    postId: string({
      required_error: "Post ID is required",
    }),
  }),
};

const createPostSchema = object({
  ...createPostPayload,
});

const updatePostSchema = object({
  ...params,
});

const updatePostLikeSchema = object({
  ...updatePostLikePayload,
  ...params,
});

const deletePostSchema = object({
  ...params,
});

const readPostSchema = object({
  ...params,
});

module.exports = {
  createPostPayload,
  createPostSchema,
  deletePostSchema,
  updatePostSchema,
  readPostSchema,
  updatePostLikeSchema,
};
