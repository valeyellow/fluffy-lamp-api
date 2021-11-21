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

/**
 * @openapi
 * /api/auth/generateOtp:
 *  post:
 *     tags:
 *     - Authentication
 *     description: Generates OTP to verify input email
 *     responses:
 *       200:
 *         description: App is up and running
 */
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
