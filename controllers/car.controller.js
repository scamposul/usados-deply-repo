const createHttpError = require("http-errors");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const CarServices = require("../services/cars.services");

// example of a controller. First call the service, then build the controller method
module.exports = {
  post: catchAsync(async (req, res, next) => {
    const newCar = req.body;
    req.body.seller_id = req.user.id;
    const result = await CarServices.addVehicle(newCar);
    endpointResponse({
      res,
      message: "Car added successfully",
      body: result,
      code: 201,
    });
  }),
  get: catchAsync(async (req, res, next) => {
    const result = await CarServices.getVehicles(req.query);
    endpointResponse({
      res,
      message: "Vehicles listed successfully",
      body: result,
      code: 200,
    });
  }),
  getVehicleById: catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const result = await CarServices.findVehicleById(id);

    if (!result) {
      return next(
        createHttpError(404, "No se encontro ningun vehiculo con ese Id")
      );
    }

    endpointResponse({
      res,
      message: "Se encontro el vehiculo exitosamente!",
      body: result,
      code: 200,
    });
  }),
  getVehiclesBySellerId: catchAsync(async (req, res, next) => {
    const { seller_id } = req.params;
    const result = await CarServices.getBySellerId(seller_id);
    endpointResponse({
      res,
      message: "Vehicles listed successfully",
      body: result,
      code: 200,
    });
  }),
  updateVehicles: catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const newInfo = req.body;
    const result = await CarServices.updateVehicle(id, newInfo, req.user);
    endpointResponse({
      res,
      message: "Vehicle updated successfully",
      body: result,
      code: 200,
    });
  }),
  deleteVehicles: catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const result = await CarServices.deleteCar(id, req.user);
    endpointResponse({
      res,
      message: "Vehicle removed successfully",
      body: result,
      code: 200,
    });
  }),
};
