import mongoose from "mongoose";
import UserRepository from "./user.repository.js";
import { ApplicationError } from "../../middlewares/error.handler.js";
import { hashPassword } from "../../utils/hashPassword.js";
import jwt from "jsonwebtoken";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(req, res, next) {
    const { name, email, password, mobile, gender } = req.body;
    try {
      let hashedPassword = await hashPassword(password);
      const userData = {
        name,
        email,
        password: hashedPassword,
        mobile,
        gender,
      };
      const newUser = await this.userRepository.signUp(userData);
      if (newUser.sucess) {
        res.status(201).json({
          sucess: true,
          msg: "user registration sucessful",
          res: newUser.res,
        });
      } else {
        // next(new ApplicationError(newUser.error.code, newUser.error.msg));
        res.status(newUser.error.code).json({
          success: false,
          error: newUser.error.msg,
        });
      }
    } catch (error) {
      next(new ApplicationError(error.message || "Something went wrong", 400));
    }
  }

  async signIn(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await this.userRepository.signIn(email, password);
      if (user.sucess) {
        const token = jwt.sign(
          {
            _id: user.res._id,
            user: user.res,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res
          .cookie("jwtToken", token)
          .json({ sucess: true, msg: "User Login Successful", token });
      } else {
        next(new ApplicationError(user.error.code, user.error.msg));
      }
    } catch (error) {
      throw new ApplicationError(404, "something is wrong");
    }
  }

  async updateUserPassword(req, res, next) {
    const { password } = req.body;
    const user = await this.userRepository.updateUserPassword(
      req.userID,
      password,
      next
    );
    if (user.sucess) {
      res.status(201).json({
        sucess: true,
        msg: "password updated sucessfully",
        res: user.res,
      });
    } else {
      next(new ApplicationError(user.error.code, user.error.msg));
    }
  }

  async userLogout(req, res, next) {
    res.clearCookie("jwtToken").json({ sucess: true, msg: "Logout sucessful" });
  }
}
