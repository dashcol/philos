import mongoose from "mongoose";

export const postsSchema = new mongoose.Schema({
  caption: { type: String, required: [true, "Enter a caption for your post"] },
  image: {
    type: String,
    required: [true, "Enter an image URL"],
    match: [
      /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i,
      "Please enter a valid image URL (must end with .png, .jpg, .jpeg, .gif, or .webp)",
    ],
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});
