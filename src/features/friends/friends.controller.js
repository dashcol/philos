import { ApplicationError } from "../../middlewares/error.handler.js";
import FriendRepository from "./friends.repository.js";

export default class FriendController {
  constructor() {
    this.repository = new FriendRepository();
  }

  async sendRequest(req, res, next) {
    try {
      const userId = req.userID;
      const { friendId } = req.body;

      const existingRequest = await this.repository.findRequest(
        userId,
        friendId
      );
      if (existingRequest) {
        return res
          .status(409)
          .json({ msg: "Request already sent or users are already friends" });
      }

      const requestSent = await this.repository.sendRequest(userId, friendId);
      res.status(201).json({ msg: "Request sent", request: requestSent });
    } catch (error) {
      console.log(error);

      next(new ApplicationError(500, "Unable to send request"));
    }
  }

  async acceptFriendRequest(req, res, next) {
    try {
      const userId = req.userID;
      const { friendId } = req.body;

      const request = await this.repository.acceptFriendRequest(
        userId,
        friendId
      );
      console.log(request);

      if (!request) {
        return res.status(404).json({ msg: "Friend request not found" });
      }

      res.status(200).json({ msg: "Request accepted", friend: request });
    } catch (error) {
      next(new ApplicationError(500, "Unable to accept request"));
    }
  }

  async declineFriendRequest(req, res, next) {
    try {
      const userId = req.userID;
      const { friendId } = req.body;

      const request = await this.repository.declineFriendRequest(
        userId,
        friendId
      );
      if (!request) {
        return res.status(404).json({ msg: "Friend request not found" });
      }

      res.status(200).json({ msg: "Friend request declined" });
    } catch (error) {
      next(new ApplicationError(500, "Unable to decline request"));
    }
  }

  async removeFriend(req, res, next) {
    try {
      const userId = req.userID;
      const { friendId } = req.body;

      const removed = await this.repository.removeFriend(userId, friendId);
      if (!removed) {
        return res.status(404).json({ msg: "Friend not found" });
      }

      res.status(200).json({ msg: "Friend removed" });
    } catch (error) {
      next(new ApplicationError(500, "Unable to remove friend"));
    }
  }

  async getFriends(req, res, next) {
    try {
      const userId = req.userID;
      const friends = await this.repository.getFriends(userId);
      res.status(200).json({ friends });
    } catch (error) {
      next(new ApplicationError(500, "Unable to fetch all friends"));
    }
  }

  async getPendingRequests(req, res, next) {
    try {
      const userId = req.userID;
      const pendingRequests = await this.repository.getPendingRequests(userId);
      res.status(200).json({ pendingRequests });
    } catch (error) {
      next(new ApplicationError(500, "Unable to fetch pending requests"));
    }
  }
}
