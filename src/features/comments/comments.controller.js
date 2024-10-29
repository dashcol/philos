import { ApplicationError } from "../../middlewares/error.handler.js";
import { CommentRepository } from "./comments.repository.js";

export default class commentController {
  constructor() {
    this.repository = new CommentRepository();
  }

  async createComment(req, res, next) {
    try {
      const { text, postId } = req.body;
      const userId = req.userID;
      const commentData = { text, userId, postId };
      const comment = await this.repository.createComment(commentData);
      res.status(201).json({ message: "Comment added", comment });
    } catch (error) {
      console.log(error);

      next(new ApplicationError(500, "Unable to create comment"));
    }
  }
  async editComment(req, res, next) {
    try {
      const { text, commentId } = req.body;
      const userId = req.userID;
      const editedComment = await this.repository.editComment(
        text,
        commentId,
        userId
      );
      res.status(201).json({ message: "comment edited", editedComment });
    } catch (error) {
      next(new ApplicationError(500, "Unable to edit comment"));
    }
  }
  async deleteComment(req, res, next) {
    try {
      const { commentId } = req.body;
      const deletedComment = await this.repository.deleteComment(commentId);
      res.status(201).json({ message: "comment deleted" });
    } catch (error) {
      next(new ApplicationError(500, "Unable to delete comment"));
    }
  }
}
