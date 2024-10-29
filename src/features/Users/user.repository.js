import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../middlewares/error.handler.js";
import { compareHashPassword, hashPassword } from "../../utils/hashPassword.js";

const userModel = mongoose.model("User", userSchema);

export default class UserRepository {
  async signUp(userData) {
    try {
      const existingUser = await userModel.findOne({ email: userData.email });
      if (existingUser) {
        return {
          success: false,
          error: { code: 400, msg: "User already exists, please sign in" },
        };
      }
      const user = new userModel(userData);
      await user.save();
      return {
        sucess: true,
        res: user,
      };
    } catch (error) {
      console.log(error);

      return { success: false, error: { code: 500, msg: "SignUp failed" } };
    }
  }

  async signIn(useremail, userpassword) {
    try {
      const user = await userModel.findOne({ email: useremail });
      if (!user) {
        return {
          sucess: false,
          error: { code: 404, msg: "User not Found" },
        };
      } else {
        let validation = await compareHashPassword(userpassword, user.password);

        if (validation) {
          return { sucess: true, res: user };
        } else {
          return {
            sucess: false,
            error: { code: 400, msg: "Invalid Credentials" },
          };
        }
      }
    } catch (error) {
      return {
        sucess: false,
        error: { code: 400, msg: "SignIn failed" },
      };
    }
  }

  async userPhoneNumber(userId) {
    try {
      const user = await userModel.findById(userId).select("mobile");
      if (!user) {
        return { success: false, error: { code: 404, msg: "User not found" } };
      }
      return { success: true, mobile: user.mobile };
    } catch (error) {
      return {
        success: false,
        error: { code: 500, msg: "mobile number not found" },
      };
    }
  }
  async updatePassword(userId, newPassword) {
    try {
      const changePassword = await userModel.findByIdAndUpdate(
        userId,
        {
          password: newPassword,
        },
        { new: true }
      );
      if (!changePassword) {
        throw new ApplicationError(
          400,
          "User not found or password update failed"
        );
      }

      return changePassword;
    } catch (error) {
      throw new ApplicationError(400, "Unable to update password");
    }
  }
  async updateMobileNuber(userId, number) {
    try {
      const changeNumber = await userModel.findByIdAndUpdate(
        userId,
        {
          mobile: number,
        },
        { new: true }
      );
      if (!changeNumber) {
        throw new ApplicationError(
          400,
          "User not found or mobile change failed"
        );
      }
      return changeNumber;
    } catch (error) {
      console.log(error);

      throw new ApplicationError(400, "Unable to update mobile");
    }
  }
  async updateGender(userId, newGender) {
    try {
      const changeGender = await userModel.findByIdAndUpdate(
        userId,
        {
          gender: newGender,
        },
        { new: true }
      );
      if (!changeGender) {
        throw new ApplicationError(
          400,
          "User not found or gender change failed"
        );
      }
      return changeGender;
    } catch (error) {
      throw new ApplicationError(400, "Unable to update mobile");
    }
  }
  async updateName(userId, newName) {
    try {
      const changeName = await userModel.findByIdAndUpdate(
        userId,
        {
          name: newName,
        },
        { new: true }
      );
      if (!changeName) {
        throw new ApplicationError("User not found or gender change failed");
      }
      return changeName;
    } catch (error) {
      throw new ApplicationError(500, "Unable to update mobile");
    }
  }
}
