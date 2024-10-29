import mongoose from "mongoose";
import { commentSchema } from "./comments.schema.js";
import { postsSchema } from "../Posts/posts.schema.js";

const commentModel = mongoose.model("Comment", commentSchema);
const postsModel = mongoose.model("Post", postsSchema);

export class CommentRepository {
  async createComment(commnetData) {
    try {
      const comment = new commentModel(commnetData);
      await comment.save();

      await postsModel.findByIdAndUpdate(comment.postId, {
        $push: {
          comments: {
            userId: comment.userId,
            text: comment.text,
            createdAt: comment.createdAt,
          },
        },
      });
      return comment;
    } catch (error) {
      return {
        success: false,
        error: { code: 500, msg: "Unable to create comment" },
      };
    }
  }
  async editComment(text, commentId, userId) {
    try {
      const updatedComment = await commentModel.findByIdAndUpdate(
        commentId,
        { text, userId },
        { new: true }
      );

      if (!updatedComment) {
        return {
          success: false,
          error: { code: 404, msg: "Comment not found" },
        };
      }

      return {
        success: true,
        res: updatedComment,
      };
    } catch (error) {
      return {
        success: false,
        error: { code: 500, msg: "Unable to edit comment" },
      };
    }
  }
  async deleteComment(commentId) {
    try {
      const deletedComment = await commentModel.findByIdAndDelete(commentId);
      if (!deletedComment) {
        return {
          sucess: false,
          code: 404,
          msg: "Comment not found",
        };
      }
      return {
        success: true,
        res: deletedComment,
      };
    } catch (error) {
      return {
        success: false,
        error: { code: 500, msg: "Unable to delete comment" },
      };
    }
  }
}
