import express from "express";
import ProfileController from "./profile.controller.js";

const profileRouter = express.Router();

const profileController = new ProfileController();

profileRouter.post("/gender", (req, res, next) => {
  profileController.updateGender(req, res, next);
});

profileRouter.post("/name", (req, res, next) => {
  profileController.updateName(req, res, next);
});

profileRouter.post("/mobile", (req, res, next) => {
  profileController.updateMobile(req, res, next);
});

export default profileRouter;
