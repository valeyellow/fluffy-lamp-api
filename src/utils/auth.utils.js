const dayjs = require("dayjs");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { toNumber } = require("lodash");

const { subject, message } = require("../templates/emailVerification.template");

dotenv.config();

// get the current timestamp and add user specified mins to it
const getOtpExpiry = (expireIn) => dayjs().unix() + toNumber(expireIn) * 60;

const sendOtpToMail = async (receipentEmail, generatedOtp, expireIn) => {
  try {
    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });

    // create the mail options
    const mailOptions = {
      from: `"Team Fluffy Lamp"<${process.env.EMAIL_USERNAME}>`,
      to: `${receipentEmail}`,
      subject,
      text: message(generatedOtp, expireIn),
    };

    await transporter.verify();

    // Send Email
    await transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        throw new Error(err);
      } else {
        return true;
      }
    });
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  getOtpExpiry,
  sendOtpToMail,
};
