import { ApplicationError } from "../../middlewares/error.handler.js";
import UserRepository from "../Users/user.repository.js";

export default class ProfileController {
  constructor() {
    this.repository = new UserRepository();
  }
  async updateMobile(req, res, next) {
    try {
      const { mobile } = req.body;
      const userId = req.userID;
      const result = await this.repository.updateMobileNuber(userId, mobile);
      if (!result) {
        res.status(400).json({ msg: "mobile NUmber Not updated" });
      }
      res
        .status(201)
        .json({ msg: "mobile NUmber updated Sucessfully", result });
    } catch (error) {
      next(new ApplicationError(400, error.message || "Something went wrong"));
    }
  }
  async updateGender(req, res, next) {
    try {
      const { gender } = req.body;
      const userId = req.userID;
      const result = await this.repository.updateGender(userId, gender);
      if (!result) {
        res.status(400).json({ msg: "Gender Not updated" });
      }
      res.status(201).json({ msg: "Gender updated Sucessfully", result });
    } catch (error) {
      next(new ApplicationError(400, error.message || "Something went wrong"));
    }
  }

  async updateName(req, res, next) {
    try {
      const { name } = req.body;
      const userId = req.userID;
      const result = await this.repository.updateName(userId, name);
      if (!result) {
        res.status(400).json({ msg: "Name Not updated" });
      }
      res.status(201).json({ msg: "Name updated Sucessfully", result });
    } catch (error) {
      next(new ApplicationError(400, error.message || "Something went wrong"));
    }
  }
}
