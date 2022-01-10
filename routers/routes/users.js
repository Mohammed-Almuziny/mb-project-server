const express = require("express");

const {
  register,
  verifyUser,
  logIn,
  enrole,
  forgetPassword,
  changePassword,
  setting,
  getUserInfo,
  blockUser,
} = require("./../controllers/users");
const authentication = require("./../middlewares/authentication");
const authorization = require("./../middlewares/authorization");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.get("/verify/:token", verifyUser);
userRouter.post("/login", logIn);
userRouter.post("/enrole", enrole);
userRouter.post("/forgetPass", forgetPassword);
userRouter.put("/changePassword", authentication, changePassword);
userRouter.get("/info/:userId", authentication, getUserInfo);
userRouter.put("/block/:userId", authentication, authorization, blockUser);
userRouter.put("/:userId", authentication, setting);

module.exports = userRouter;
