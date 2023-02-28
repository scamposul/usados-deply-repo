const { Op } = require("sequelize");
const Reviews = require("../models/reviews.model");
const checkPermissions = require("../utils/checkPermissions");

class ReviewsServices {
  static async createReview(body) {
    try {
      const { car_id, seller_id } = body;
      const [response, created] = await Reviews.findOrCreate({
        where: { [Op.and]: [{ car_id }, { seller_id }] },
        defaults: body,
      });

      return [response, created];
    } catch (error) {
      throw error;
    }
  }
  static async findReviewById(id) {
    try {
      const result = await Reviews.findOne({ where: { id } });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async updateReview(id, newReview, reqUser) {
    try {
      const review = await Reviews.findOne({ where: { id } });

      if (!review) {
        throw new Error("No se encontro ninguna review con ese Id");
      }

      checkPermissions(reqUser, review.seller_id);

      await review.update(newReview);

      return review;
    } catch (error) {
      throw error;
    }
  }
  static async deleteReview(id, reqUser) {
    try {
      const review = await Reviews.findOne({ where: { id } });

      if (!review) {
        throw new Error("No se encontro ninguna review con ese Id");
      }

      checkPermissions(reqUser, review.seller_id);

      await review.destroy();

      return `Review ${id} eliminada`;
    } catch (error) {
      throw error;
    }
  }
  static async findCarReviews(id) {
    try {
      const allReviews = await Reviews.findAll({ where: { car_id: id } });
      return allReviews;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ReviewsServices;
