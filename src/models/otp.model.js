const mongoose = require("mongoose");
const dayjs = require("dayjs");

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    expiresAt: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

// check if otp has expired
otpSchema.methods.validateOtp = async function () {
  const otpDocument = this;
  const currentTimeStamp = dayjs().unix();
  const isValid = otpDocument.expiresAt > currentTimeStamp;

  return isValid;
};

const OtpModel = mongoose.model("Otp", otpSchema);

module.exports = OtpModel;
