import express from "express";
import OtpController from "./otp.controller.js";

const otpRouter = express.Router();

const otpController = new OtpController();

otpRouter.get("/", (req, res, next) => {
  otpController.createAndSendOtp(req, res, next);
});
otpRouter.get("/", (req, res, next) => {
  otpController.checkOtpAndChangePassword(req, res, next);
});
export default otpRouter;
