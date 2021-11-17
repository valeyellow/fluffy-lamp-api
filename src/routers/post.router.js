const { Router } = require("express");
const {
  postHealthCheckHandler,
  createPostHandler,
  updatePostHandler,
  deletePostHandler,
} = require("../controller/post.controller");
const {
  createPostSchema,
  updatePostLikeSchema,
  deletePostSchema,
} = require("../schema/post.schema");
const verifyResources = require("../middleware/verifyResources");

const router = Router();

router.get("/api/postHealthCheck", postHealthCheckHandler);

router.post("/api/post", verifyResources(createPostSchema), createPostHandler);

router.patch(
  "/api/post/:postId/like",
  verifyResources(updatePostLikeSchema),
  updatePostHandler,
);

router.delete(
  "/api/post/:postId",
  verifyResources(deletePostSchema),
  deletePostHandler,
);

module.exports = router;
