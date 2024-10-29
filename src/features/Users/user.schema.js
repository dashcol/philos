import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
    minLength: [3, "Name Should be at least three Characters"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
    match: [/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;"'<>,.?/~`-])[A-Za-z\d!@#$%^&*()_+{}[\]:;"'<>,.?/~`-]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ],
  },

  mobile: {
    type: String,
    unique: true,
    required: [true, "mobile number is required"],
    match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"],
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: [true, "Please provide your gender e.g-male"],
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  friendRequests: [
    {
      requester: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: {
        type: String,
        enum: ["pending", "accepted", "declined"],
        default: "pending",
      },
    },
  ],
});
