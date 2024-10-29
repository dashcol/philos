import mongoose from "mongoose";
import { likeSchema } from "./likes.schema.js";
import { postsSchema } from "../Posts/posts.schema.js";

const postModel = mongoose.model("Post", postsSchema);

export default class LikeRepository {
  async addLike(postId, userId) {
    try {
      const post = await postModel.findById(postId);
      if (post.likes.includes(userId)) {
        return { success: false, msg: "Post already liked" };
      }
      post.likes.push(userId);
      await post.save();
      return { success: true, post };
    } catch (error) {
      return { success: false, error: "Unable to like post" };
    }
  }
  async unLike(postId, userId) {
    try {
      const post = await postModel.findById(postId);
      if (!post.likes.includes(userId)) {
        post.likes.push(userId);
        await post.save();
        return { success: true, post };
      } else {
        post.likes = post.likes.filter(
          (id) => id.toString() !== userId.toString()
        );
        await post.save();
        return { success: true, msg: "Post unliked", post };
      }
    } catch (error) {
      return { success: false, error: "Unable to unlike post" };
    }
  }
}
