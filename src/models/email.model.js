const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const EmailModel = mongoose.model("Email", emailSchema);

module.exports = EmailModel;
