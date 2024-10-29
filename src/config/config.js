import mongoose from "mongoose";

const burl = process.env.URL;

export const connectToDB = async () => {
  mongoose
    .connect(burl)
    .then(() => console.log("MongoDB is Connected"))
    .catch((error) => console.error("MongoDB connection error:", error));
};
