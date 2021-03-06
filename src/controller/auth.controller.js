const otpGenerator = require("otp-generator");
const dotenv = require("dotenv");

const { signJwt } = require("../utils/jwt.utils");
const logger = require("../utils/logger");
const {
  findEmail,
  createEmail,
  createOtpDocument,
  findOtpDocument,
  updateEmail,
  removeVerifiedOtp,
} = require("../service/auth.service");
const { findUser } = require("../service/user.service");
const { getOtpExpiry, sendOtpToMail } = require("../utils/auth.utils");

dotenv.config();

const accessTokenTtl = process.env.ACCESS_TOKEN_TTL;

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

// search otp -> if otp is not found in DB -> return 404
// check if otp.email === email, if false -> return 400
// mark entered email as verified -> query userModel for input email
// if user is found -> create access and return (user + token)
// after successful verification -> remove the otp document from db

// eslint-disable-next-line consistent-return
const verifyOtpHandler = async (req, res) => {
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

    // check if otp has expired
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

    // remove otp document from db
    await removeVerifiedOtp({ otp });

    const user = await findUser({ email });
    if (user) {
      // create and send access token
      const accessToken = await signJwt(
        { ...user.toObject() },
        { expiresIn: accessTokenTtl },
      );

      return res.status(200).send({ user, accessToken });
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
