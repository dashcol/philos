import { ApplicationError } from "../../middlewares/error.handler.js";
import LikeRepository from "./likes.repository.js";

export default class LikeController {
  constructor() {
    this.repository = new LikeRepository();
  }

  async addLike(req, res, next) {
    try {
      const { postId } = req.body;
      const userId = req.userID;
      const result = await this.repository.addLike(postId, userId);

      if (!result.success) {
        return res.status(400).json({ message: result.msg });
      }

      res.status(201).json({ message: "Post liked", post: result.post });
    } catch (error) {
      next(new ApplicationError(500, "Unable to like post"));
    }
  }
  async unLike(req, res, next) {
    try {
      const { postId } = req.body;
      const userId = req.userID;
      const unlike = await this.repository.unLike(postId, userId);
      res.status(201).json({ message: "Post unliked", post: unlike.post });
    } catch (error) {
      next(new ApplicationError(500, "Unable to unlike post"));
    }
  }
}
