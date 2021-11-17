const { Router } = require("express");

const auth = require("../middleware/auth");
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
router.post("/api/post", [auth, verifyResources(createPostSchema)], createPostHandler);

// like/dislike a post
router.patch(
  "/api/post/:postId/like",
  [auth, verifyResources(updatePostLikeSchema)],
  updatePostHandler,
);

// delete a post
router.delete(
  "/api/post/:postId",
  [auth, verifyResources(deletePostSchema)],
  deletePostHandler,
);

// read a post with postId
router.get(
  "/api/post/:postId",
  [auth, verifyResources(readPostSchema)],
  getPostHandler,
);

// add comment to a post
router.post(
  "/api/post/:postId/comment",
  [auth, verifyResources(createCommentSchema)],
  addCommentHandler,
);

// get comments for a post
router.get(
  "/api/post/:postId/comment",
  [auth, verifyResources(readCommentSchema)],
  getCommentHandler,
);

module.exports = router;
