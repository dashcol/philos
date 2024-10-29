// otpRepository.js
import mongoose from "mongoose";
import { otpSchema } from "./otp.schema.js";
import { ApplicationError } from "../../middlewares/error.handler.js";

const otpModel = mongoose.model("OTP", otpSchema);

export default class OtpRepository {
  async createOtp(userId, otpCode, expiresAt) {
    const otp = new otpModel({ userId, otpCode, expiresAt });
    return otp.save();
  }

  async checkOTP(otpCode) {
    const otp = await otpModel.findOne({
      otpCode,
      used: false,
      expiresAt: { $gt: new Date() },
    });
    if (otp) {
      otp.used = true;
      await otp.save();
      return otp;
    }
    throw new ApplicationError(400, "Invalid or expired OTP");
  }
}
