const express = require("express");
const {
  post,
  get,
  getVehiclesBySellerId,
  updateVehicles,
  deleteVehicles,
  getVehicleById,
} = require("../controllers/car.controller");
const { authenticateUser, dataValidator } = require("../middlewares/");
const { createUpdateCarSchema } = require("../validators");

const router = express.Router();

router.post(
  "/post",
  [authenticateUser, dataValidator(createUpdateCarSchema)],
  post
);

router.get("/all", get);

router.get("/:id", getVehicleById);

router.get("/all/:seller_id", getVehiclesBySellerId);

router.put(
  "/edit/:id",
  [authenticateUser, dataValidator(createUpdateCarSchema)],
  updateVehicles
);

router.delete("/remove/:id", authenticateUser, deleteVehicles);

module.exports = router;
