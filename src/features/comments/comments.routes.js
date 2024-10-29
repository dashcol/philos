import express from "express";

import commentController from "./comments.controller.js";

const commentRouter = express.Router();
const CommentController = new commentController();

commentRouter.post("/create", (req, res, next) => {
  CommentController.createComment(req, res, next);
});
commentRouter.post("/edit", (req, res, next) => {
  CommentController.editComment(req, res, next);
});
commentRouter.post("/delete", (req, res, next) => {
  CommentController.deleteComment(req, res, next);
});
export default commentRouter;
