import express from "express";
import UserController from "./user.controller.js";
import { jwtAuth } from "../../middlewares/jwtAuth.js";

const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/register", (req, res, next) => {
  userController.signUp(req, res, next);
});
userRouter.post("/login", (req, res, next) => {
  userController.signIn(req, res, next);
});

userRouter.post("/changePassword", jwtAuth, (req, res, next) => {
  userController.updateUserPassword(req, res, next);
});

userRouter.get("/logout", (req, res, next) => {
  userController.userLogout(req, res, next);
});
export default userRouter;
