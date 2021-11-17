const subject = "OTP: For Email Verification";

const message = (otp, validity) => (
  "Dear User, \n\n"
    + "OTP for your email verification is : \n\n"
    + `${otp} and is valid for ${validity} minutes.\n\n`
    + "This is a auto-generated email. Please do not reply to this email.\n\n"
    + "Regards\n"
    + "Team Fluffy Lamp\n\n"
);

module.exports = { subject, message };
