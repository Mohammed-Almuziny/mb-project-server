const express = require("express");

const {
  createReview,
  getUserReview,
  getCourseReviews,
} = require("./../controllers/reviews");
const authentication = require("./../middlewares/authentication");

const reviewsRouter = express.Router();

reviewsRouter.post("/", authentication, createReview);
reviewsRouter.post("/getUserReview", getUserReview);
reviewsRouter.get("/:courseId", getCourseReviews);

module.exports = reviewsRouter;
