import mongoose from "mongoose";
import { friSchema } from "./friends.schema.js";

const friendSchema = mongoose.model("Friend", friSchema);

export default class FriendRepository {
  async sendRequest(userId, friendId) {
    try {
      const sendRequest = new friendSchema({
        requester: userId,
        recipient: friendId,
        status: "pending",
      });
      return await sendRequest.save();
    } catch (error) {
      console.log(error);
      return { success: false, error: "Unable to send friend request" };
    }
  }
  async acceptFriendRequest(userId, friendId) {
    return await friendSchema.findOneAndUpdate(
      {
        recipient: userId,
        requester: friendId,
        status: "pending",
      },
      { status: "accepted" },
      { new: true }
    );
  }

  async declineFriendRequest(userId, friendId) {
    return await friendSchema.findOneAndUpdate(
      { requester: userId, recipient: friendId, status: "pending" },
      { status: "declined" },
      { new: true }
    );
  }

  async removeFriend(userId, friendId) {
    return await friendSchema.findOneAndDelete({
      $or: [
        { requester: userId, recipient: friendId, status: "accepted" },
        { requester: friendId, recipient: userId, status: "accepted" },
      ],
    });
  }

  async getFriends(userId) {
    return await friendSchema
      .find({
        $or: [{ requester: userId }, { recipient: userId }],
        status: "accepted",
      })
      .populate("requester recipient", "username");
  }

  async getPendingRequests(userId) {
    return await friendSchema
      .find({
        recipient: userId,
        status: "pending",
      })
      .populate("requester", "username");
  }

  async findRequest(userId, friendId) {
    return await friendSchema.findOne({
      $or: [
        { requester: userId, recipient: friendId },
        { requester: friendId, recipient: userId },
      ],
    });
  }
}
