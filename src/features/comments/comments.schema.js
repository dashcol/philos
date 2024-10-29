import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "provide your comment here"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
