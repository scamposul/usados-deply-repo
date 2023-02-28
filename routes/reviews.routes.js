const express = require("express");
const {
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
  getCarReviews,
} = require("../controllers/reviews.controller");
const { authenticateUser, dataValidator } = require("../middlewares");
const { createReviewSchema, updateReviewSchema } = require("../validators");

const router = express.Router();

router.post(
  "/",
  [authenticateUser, dataValidator(createReviewSchema)],
  createReview
);

router.get("/:id", getSingleReview);

router.get("/all/:car_id", getCarReviews);

router.put(
  "/edit/:id",
  [authenticateUser, dataValidator(updateReviewSchema)],
  updateReview
);

router.delete("/remove/:id", authenticateUser, deleteReview);

module.exports = router;
