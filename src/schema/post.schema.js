const { object, string, boolean } = require("zod");

/**
 * @openapi
 * components:
 *  schemas:
 *    CreatePostInput:
 *      type: object
 *      required:
 *        - postContent
 *      optional:
 *        - isLiked
 *      properties:
 *        postContent:
 *          type: string
 *          default: Hi this is a sample post
 *        isLiked:
 *          type: boolean
 *          default: false
 *    CreatePostResponse:
 *      type: object
 *      properties:
 *        type:
 *          postContent: string
 *        isLiked:
 *          type: boolean
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */
const createPostPayload = {
  body: object({
    postContent: string({
      required_error: "Post content is required",
    }).max(300, "Sorry, post length must be 300 characters or less"),
    isLiked: boolean().optional(),
  }),
};

/**
 * @openapi
 * components:
 *  schemas:
 *    UpdatePostInput:
 *      type: object
 *      required:
 *        - isLiked
 *      properties:
 *        isLiked:
 *          type: boolean
 *          default: false
 *    CreatePostResponse:
 *      type: object
 *      properties:
 *        postContent:
 *          type: string
 *        isLiked:
 *          type: boolean
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */
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
