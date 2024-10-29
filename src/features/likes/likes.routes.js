import express from "express";
import LikeController from "./likes.controller.js";

const likeRouter = express.Router();
const likeController = new LikeController();

likeRouter.post("/like", (req, res, next) => {
  likeController.addLike(req, res, next);
});
likeRouter.post("/unlike", (req, res, next) => {
  likeController.unLike(req, res, next);
});

export default likeRouter;
