const { Router } = require("express");
const {
  postHealthCheckHandler,
  createPostHandler,
  updatePostHandler,
} = require("../controller/post.controller");
const {
  createPostSchema,
  updatePostLikeSchema,
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

module.exports = router;
