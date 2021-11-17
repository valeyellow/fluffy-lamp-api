const otpGenerator = require("otp-generator");
const logger = require("../utils/logger");
const {
  findEmail,
  createEmail,
  createOtpDocument,
  findOtpDocument,
  updateEmail,
} = require("../service/auth.service");
const { findUser } = require("../service/user.service");
const { getOtpExpiry, sendOtpToMail } = require("../utils/auth.utils");

const generateOtpHandler = async (req, res) => {
  try {
    // generate an OTP
    // send the otp to user's email
    // check and insert the email into the email collection if it doesn't exist
    // insert the otp document into Otp collection
    const { email } = req.body;

    const emailDoc = await findEmail({ email });

    if (!emailDoc) {
      await createEmail(req.body);
    }

    const otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
    });

    await sendOtpToMail(email, otp, 10);

    const expiresAt = getOtpExpiry(10);
    await createOtpDocument({ email, otp, expiresAt });

    res.status(200).send({ type: "success", message: "OTP sent to email" });
  } catch (e) {
    logger.error(e);
    res
      .status(500)
      .send({ type: "error", message: e?.message || "Could not generate otp" });
  }
};

const verifyOtpHandler = async (req, res) => {
  // if otp is not found in DB, return 404
  // check if otp.email === email, if false -> return 400
  // mark the entered email as verified, query the userModel for the email
  // if user is found, return the user
  try {
    const { email, otp } = req.body;

    // find the entered otp from OtpModel
    const otpDocument = await findOtpDocument({ otp });
    if (
      !otpDocument
      || otpDocument.email.toLowerCase() !== email.toLowerCase()
    ) {
      return res.status(404).send({
        type: "error",
        message: "You have entered an incorrect email/otp combination",
      });
    }

    const isValid = await otpDocument.validateOtp();
    if (!isValid) {
      return res.status(400).send({
        type: "error",
        message: "OTP has expired.",
      });
    }

    const emailDocument = await findEmail({ email });
    if (emailDocument) {
      await updateEmail({ email }, { isVerified: true });
    }
    const user = await findUser({ email });
    if (user) {
      return res.status(200).send(user);
    }

    res
      .status(200)
      .send({ type: "success", message: "Email verified successfully" });
  } catch (e) {
    logger.error(e);
    res
      .status(500)
      .send({ type: "error", message: e?.message || "Could not verify otp" });
  }
};

module.exports = {
  generateOtpHandler,
  verifyOtpHandler,
};
