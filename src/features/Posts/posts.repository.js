import { postsSchema } from "./posts.schema.js";
import mongoose from "mongoose";

const postsModel = mongoose.model("Post", postsSchema);

export default class PostsRepository {
  async createPost(postData) {
    try {
      const post = new postsModel(postData);
      const savedPost = await post.save();
      return {
        sucess: true,
        res: savedPost,
      };
    } catch (error) {
      return {
        success: false,
        error: { code: 500, msg: "Unable to create Post" },
      };
    }
  }

  async editPost(caption, image, postID) {
    try {
      const updatedPost = await postsModel.findByIdAndUpdate(
        postID,
        { caption, image },
        { new: true }
      );

      if (!updatedPost) {
        return {
          success: false,
          error: { code: 404, msg: "Post not found" },
        };
      }

      return {
        success: true,
        res: updatedPost,
      };
    } catch (error) {
      return {
        success: false,
        error: { code: 500, msg: "Unable to edit Post" },
      };
    }
  }

  async DeletePost(postID) {
    try {
      const deletedPost = await postsModel.findByIdAndDelete(postID);

      if (!deletedPost) {
        return {
          success: false,
          error: { code: 404, msg: "Post not found" },
        };
      }

      return {
        success: true,
        res: deletedPost,
      };
    } catch (error) {
      return {
        success: false,
        error: { code: 500, msg: "Unable to delete Post" },
      };
    }
  }
  async getAllPosts(userId) {
    try {
      const posts = await postsModel.find({ userId });
  
      if (!posts.length) {
        return {
          success: false,
          error: { code: 404, msg: "No posts found for this user" },
        };
      }
  
      return {
        success: true,
        res: posts,
      };
    } catch (error) {
      return {
        success: false,
        error: { code: 500, msg: "Unable to retrieve posts" },
      };
    }
  }
  async isPostOwner(postID, userId) {
    const post = await postsModel.findById(postID);
    return post && post.userId.toString() === userId.toString();
  }
  
  
}
