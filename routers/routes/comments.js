const express = require("express");

const {
  addcomment,
  getCommentById,
  blockComment,
} = require("./../controllers/comments");
const authentication = require("./../middlewares/authentication");
const authorization = require("./../middlewares/authorization");

const commentsRouter = express.Router();

commentsRouter.post("/", authentication, addcomment);
commentsRouter.put(
  "/block/:commentId",
  authentication,
  authorization,
  blockComment
);
commentsRouter.get("/:commentId", authentication, getCommentById);

module.exports = commentsRouter;
