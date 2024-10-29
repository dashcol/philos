import { ApplicationError } from "../../middlewares/error.handler.js";
import OtpRepository from "./otp.repository.js";
import twilio from "twilio";
import dotenv from "dotenv";
import UserRepository from "../Users/user.repository.js";
import { hashPassword } from "../../utils/hashPassword.js";

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const userRepository = new UserRepository();

export default class OtpController {
  constructor() {
    this.repository = new OtpRepository();
  }

  async createAndSendOtp(req, res, next) {
    try {
      const userId = req.userID;
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expires = new Date(Date.now() + 10 * 60 * 1000);
      const otp = await this.repository.createOtp(userId, otpCode, expires);
      if (!otp.otpCode) {
        res.status(400).json({ msg: "unable to generate OTP for Your Number" });
      }
      const userNumber = await userRepository.userPhoneNumber(userId);

      if (!userNumber.mobile) {
        res.status(400).json({ msg: "No User Number" });
      }
      await client.messages.create({
        body: `Your OTP code is ${otpCode}. It expires in 10 minutes.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: userNumber.mobile,
      });
      // await this.repository.markAsUsed(otpCode);

      res
        .status(200)
        .json({ msg: "OTP sent successfully on registered USer number" });
    } catch (error) {
      console.log(error);

      next(new ApplicationError(500, "unable to send OTP"));
    }
  }

  async checkOtpAndChangePassword(req, res, next) {
    try {
      const userId = req.userID;
      const { OTP, newPassword } = req.body;
      const result = await this.repository.checkOTP(OTP);
      if (!result) {
        return res.status(400).json({ msg: "Invalid or expired OTP" });
      }
      const hashedPassword = await hashPassword(newPassword);
      const newUser = await userRepository.updatePassword(
        userId,
        hashedPassword
      );
      res.status(201).json({ msg: "passowrd changed sucessfully", newUser });
    } catch (error) {}
  }
}
