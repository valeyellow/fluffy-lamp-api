const { Router } = require("express");
const {
  postHealthCheckHandler,
  createPostHandler,
  updatePostHandler,
  deletePostHandler,
  getPostHandler,
  addCommentHandler,
  getCommentHandler,
} = require("../controller/post.controller");
const {
  createPostSchema,
  updatePostLikeSchema,
  deletePostSchema,
  readPostSchema,
} = require("../schema/post.schema");
const verifyResources = require("../middleware/verifyResources");
const {
  createCommentSchema,
  readCommentSchema,
} = require("../schema/comment.schema");

const router = Router();

router.get("/api/postHealthCheck", postHealthCheckHandler);

// create new post
router.post("/api/post", verifyResources(createPostSchema), createPostHandler);

// like/dislike a post
router.patch(
  "/api/post/:postId/like",
  verifyResources(updatePostLikeSchema),
  updatePostHandler,
);

// delete a post
router.delete(
  "/api/post/:postId",
  verifyResources(deletePostSchema),
  deletePostHandler,
);

// read a post with postId
router.get(
  "/api/post/:postId",
  verifyResources(readPostSchema),
  getPostHandler,
);

// add comment to a post
router.post(
  "/api/post/:postId/comment",
  verifyResources(createCommentSchema),
  addCommentHandler,
);

// get comments for a post
router.get(
  "/api/post/:postId/comment",
  verifyResources(readCommentSchema),
  getCommentHandler,
);

module.exports = router;
