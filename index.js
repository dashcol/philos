import express from "express";
import dotenv from "dotenv";
import userRouter from "./src/features/Users/user.routes.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { appErrorMiddleware } from "./src/middlewares/error.handler.js";
import postRouter from "./src/features/Posts/posts.routes.js";
import { jwtAuth } from "./src/middlewares/jwtAuth.js";
import commentRouter from "./src/features/comments/comments.routes.js";
import likeRouter from "./src/features/likes/likes.routes.js";
import friendRouter from "./src/features/friends/friends.routes.js";
import otpRouter from "./src/features/OTP/otp.routes.js";
import profileRouter from "./src/features/Profile/profile.routes.js";

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/post", jwtAuth, postRouter);
app.use("/api/comment", jwtAuth, commentRouter);
app.use("/api/post", jwtAuth, likeRouter);
app.use("/api/friends", jwtAuth, friendRouter);
app.use("/api/otp", jwtAuth, otpRouter);
app.use("/api/profile", jwtAuth, profileRouter);

app.use(appErrorMiddleware);

export default app;
