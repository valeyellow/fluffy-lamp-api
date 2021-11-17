const { Router } = require("express");
const {
  userHealthCheckHandler,
  createUserHandler,
} = require("../controller/user.controller");
const createUserSchema = require("../schema/user.schema");
const verifyResources = require("../middleware/verifyResources");

const router = Router();

router.get("/api/userHealthCheck", userHealthCheckHandler);

router.post(
  "/api/users/signup",
  verifyResources(createUserSchema),
  createUserHandler,
);

// router.post("/api/generateOtp")

module.exports = router;
