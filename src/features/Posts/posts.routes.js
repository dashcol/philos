import express from "express";
import PostsController from "./posts.controller.js";

const postRouter = express.Router();
const postController = new PostsController();

postRouter.post("/create", (req, res, next) => {
  postController.createPost(req, res, next);
});
postRouter.post("/edit", (req, res, next) => {
  postController.updatePost(req, res, next);
});
postRouter.post("/delete", (req, res, next) => {
  postController.deletePost(req, res, next);
});
postRouter.get("/", (req, res, next) => {
  postController.allPosts(req, res, next);
});
export default postRouter;
