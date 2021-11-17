const { Router } = require("express");

const verifyResources = require("../middleware/verifyResources");
const {
  generateOtpSchema,
  validateOtpSchema,
} = require("../schema/auth.schema");
const {
  generateOtpHandler,
  verifyOtpHandler,
} = require("../controller/auth.controller");

const router = Router();

router.post(
  "/api/auth/generateOtp",
  verifyResources(generateOtpSchema),
  generateOtpHandler,
);

router.post(
  "/api/auth/verifyOtp",
  verifyResources(validateOtpSchema),
  verifyOtpHandler,
);

module.exports = router;
