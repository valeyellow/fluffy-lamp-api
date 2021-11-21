const { Router } = require("express");
const {
  createUserHandler,
} = require("../controller/user.controller");
const createUserSchema = require("../schema/user.schema");
const verifyResources = require("../middleware/verifyResources");

const router = Router();

router.post(
  "/api/users/signup",
  verifyResources(createUserSchema),
  createUserHandler,
);

module.exports = router;
