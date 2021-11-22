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
 *     summary: Generates OTP to verify user email
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *        schema:
 *            $ref: '#/components/schemas/GenerateOtpInput'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *          schema:
 *              $ref: '#/components/schemas/GenerateOtpResponse'
 *       500:
 *        description: Internal server error
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
