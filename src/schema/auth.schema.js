const { object, string } = require("zod");

const generateOtpSchema = object({
  body: object({
    email: string({ required_error: "Email is a required field" }).email(
      "Please enter a valid email",
    ),
  }),
});

const validateOtpSchema = object({
  body: object({
    email: string({ required_error: "Email is a required field" }).email(
      "Please enter a valid email",
    ),
    otp: string({ required_error: "OTP is a required field" }),
  }),
});

module.exports = { generateOtpSchema, validateOtpSchema };
