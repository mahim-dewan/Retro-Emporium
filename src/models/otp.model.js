import { sendOtpToEmail } from "@/lib/mail";
import { generateOTP } from "@/utils/otpGenerate";
const { Schema, default: mongoose } = require("mongoose");

// Generate OTP
const otp = () => generateOTP();

// OTP Schema
const otpSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
    default: otp,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

// Post Hook
otpSchema.post("save", async function () {
  // Send otp to user
  await sendOtpToEmail({
    userEmail: this.email,
    otp: this.otp,
  });
});

// OTP model
const OTP = mongoose.models.OTP || mongoose.model("OTP", otpSchema);

export default OTP;
