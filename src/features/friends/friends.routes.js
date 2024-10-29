import express from "express";
import FriendController from "./friends.controller.js";

const friendRouter = express.Router();
const friendController = new FriendController();

friendRouter.post("/send", (req, res, next) => {
  friendController.sendRequest(req, res, next);
});

friendRouter.post("/accept", (req, res, next) => {
  friendController.acceptFriendRequest(req, res, next);
});
friendRouter.post("/decline", (req, res, next) => {
  friendController.declineFriendRequest(req, res, next);
});
friendRouter.post("/remove", (req, res, next) => {
  friendController.removeFriend(req, res, next);
});
friendRouter.get("/get", (req, res, next) => {
  friendController.getFriends(req, res, next);
});
friendRouter.get("/requests", (req, res, next) => {
  friendController.getPendingRequests(req, res, next);
});

export default friendRouter;
