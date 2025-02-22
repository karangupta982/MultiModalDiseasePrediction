import mongoose from "mongoose";
import mailSender from "../Utils/MailSender.js";
import emailTemplate from "../MailTemplate/EmailVerification.js";



const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    await mailSender(email, "Verification Email", emailTemplate(otp));
  } catch (error) {
    // console.log(error);
    throw error;
  }
}

// Ensures that every time a new OTP record is created, an email with the OTP is sent before saving it to the database.

OTPSchema.pre("save", async function (next) {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

const OTP = mongoose.model("OTP", OTPSchema);

// module.exports = OTP;
export default OTP
