import bcrypt from "bcrypt";
import { ApplicationError } from "../middlewares/error.handler.js";

export const hashPassword = async (password, next) => {
  try {
    return await bcrypt.hash(password, 12);
  } catch (error) {
    next(new ApplicationError(400, "encountered error in hashing password"));
  }
};

export const compareHashPassword = async (password, hashPassword, next) => {
  try {
    return await bcrypt.compare(password, hashPassword);
  } catch (error) {
    next(new ApplicationError(400, "encountered error in comparing password"));
  }
};
