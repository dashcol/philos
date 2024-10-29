import { ApplicationError } from "../../middlewares/error.handler.js";
import PostsRepository from "./posts.repository.js";

export default class PostsController {
  constructor() {
    this.repository = new PostsRepository();
  }
  async createPost(req, res) {
    try {
      const { caption, image } = req.body;
      const userId = req.userID;

      if (!caption || !image) {
        return res
          .status(400)
          .json({ message: "Caption and image URL are required" });
      }

      const newPost = {
        caption,
        image,
        userId,
        createdAt: new Date(),
      };

      const savedPost = await this.repository.createPost(newPost);

      return res.status(201).json(savedPost);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to create the post" });
    }
  }
  async updatePost(req, res, next) {
    try {
      const { caption, image, postID } = req.body;
      const userId = req.userID;

      if (!caption || !image) {
        return res
          .status(400)
          .json({ message: "Caption and image URL are required" });
      }

      const isOwner = await this.repository.isPostOwner(postID, userId);
      if (!isOwner) {
        return res
          .status(403)
          .json({ message: "You are not authorized to update this post" });
      }

      const editPost = await this.repository.editPost(caption, image, postID);
      return res.status(201).json({
        success: true,
        msg: "Post edited successfully",
        res: editPost.res,
      });
    } catch (error) {
      next(new ApplicationError(500, "Unable to update post"));
    }
  }

  async deletePost(req, res, next) {
    try {
      const { postId } = req.body;
      const userId = req.userID;

      const isOwner = await this.repository.isPostOwner(postId, userId);
      if (!isOwner) {
        return res
          .status(403)
          .json({ message: "You are not authorized to delete this post" });
      }

      const deletedPost = await this.repository.DeletePost(postId);
      return res.status(201).json(deletedPost);
    } catch (error) {
      next(new ApplicationError(500, "Unable to delete post"));
    }
  }

  async allPosts(req, res, next) {
    try {
      const user = req.userID;
      const posts = await this.repository.getAllPosts(user);
      return res.status(201).json(posts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to retrive user posts" });
    }
  }
}
