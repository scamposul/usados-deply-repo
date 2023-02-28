const { response } = require("express");
const createHttpError = require("http-errors");
const { catchAsync, endpointResponse } = require("../helpers");
const CarServices = require("../services/cars.services");
const ReviewsServices = require("../services/reviews.services");

module.exports = {
  createReview: catchAsync(async (req, res, next) => {
    const { car_id } = req.body;

    const isCarValid = await CarServices.findVehicleById(car_id);
    if (!isCarValid) {
      return next(
        createHttpError(404, "No se encontro ningun vehiculo con ese Id")
      );
    }

    req.body.car_id = car_id;
    req.body.seller_id = req.user.id;

    const [response, created] = await ReviewsServices.createReview(req.body);

    if (!created) {
      return next(
        createHttpError(400, "Ya se dejo una review para este vehiculo")
      );
    }

    endpointResponse({
      res,
      code: 201,
      message: "Review creada con exito",
      body: response,
    });
  }),
  getSingleReview: catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const review = await ReviewsServices.findReviewById(id);

    if (!review) {
      return next(
        createHttpError(400, "No se encontro ninguna review con este Id")
      );
    }

    endpointResponse({
      res,
      code: 200,
      message: "Review encontrada con exito",
      body: review,
    });
  }),
  updateReview: catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const newReview = req.body;

    const result = await ReviewsServices.updateReview(id, newReview, req.user);

    endpointResponse({
      res,
      message: "Review actualizada con exito",
      body: result,
      code: 200,
    });
  }),
  deleteReview: catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const result = await ReviewsServices.deleteReview(id, req.user);

    endpointResponse({
      res,
      message: "Review eliminada con exito",
      body: result,
      code: 200,
    });
  }),
  getCarReviews: catchAsync(async (req, res, next) => {
    const { car_id } = req.params;
    const result = await ReviewsServices.findCarReviews(car_id);

    endpointResponse({
      res,
      message: "Reviews listadas con exito",
      body: result,
      code: 200,
    });
  }),
};
