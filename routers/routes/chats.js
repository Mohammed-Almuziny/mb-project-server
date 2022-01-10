const express = require("express");

const {
  sendMessage,
  getUserChats,
  getChatById,
  checkChatRoom,
} = require("./../controllers/chats");
const authentication = require("./../middlewares/authentication");

const chatsRouter = express.Router();

chatsRouter.post("/", authentication, sendMessage);
chatsRouter.get("/user/:userId", authentication, getUserChats);
chatsRouter.get("/:chatId", authentication, getChatById);
chatsRouter.post("/check", authentication, checkChatRoom);

module.exports = chatsRouter;
