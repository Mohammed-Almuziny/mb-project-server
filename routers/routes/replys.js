const express = require("express");

const {
  addReply,
  getReplyById,
  blockReply,
} = require("./../controllers/replys");
const authentication = require("./../middlewares/authentication");
const authorization = require("./../middlewares/authorization");

const replysRouter = express.Router();

replysRouter.post("/", authentication, addReply);
replysRouter.put("/block/:replyId", authentication, authorization, blockReply);
replysRouter.get("/:replyId", authentication, getReplyById);

module.exports = replysRouter;
