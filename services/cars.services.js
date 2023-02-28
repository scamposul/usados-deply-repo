const { where, Op } = require("sequelize");
const Cars = require("../models/cars.model");
const Users = require("../models/users.model");
const checkPermissions = require("../utils/checkPermissions");

class CarServices {
  static async getVehicles(reqQuery) {
    try {
      let { year, brand, model, km, city, price, type, search } = reqQuery;
      let allCars;

      if (year || brand || model || km || city || price || type || search) {
        allCars = await Cars.findAll({
          where: {
            [Op.and]: [
              year ? { year } : null,
              brand ? { brand } : null,
              model ? { model } : null,
              km ? { km } : null,
              city ? { city } : null,
              price ? { price } : null,
              type ? { type } : null,
            ],
          },
        });
      } else {
        allCars = await Cars.findAll();
      }
      return allCars;
    } catch (error) {
      throw error;
    }
  }

  static async findVehicleById(id) {
    try {
      const result = await Cars.findOne({ where: { id } });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getBySellerId(seller_id) {
    try {
      const result = await Cars.findAll({
        where: { seller_id },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async addVehicle(newCar) {
    try {
      const result = Cars.create(newCar);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async updateVehicle(id, newInfo, reqUser) {
    try {
      const car = await Cars.findOne({ where: { id } });

      if (!car) {
        throw new Error("Vehículo no encontrado");
      }

      checkPermissions(reqUser, car.seller_id);

      await car.update(newInfo);

      return car;
    } catch (error) {
      throw error;
    }
  }
  static async deleteCar(id, reqUser) {
    try {
      const car = await Cars.findOne({ where: { id } });

      if (!car) {
        throw new Error("Vehículo no encontrado");
      }

      checkPermissions(reqUser, car.seller_id);

      await car.destroy();

      return `Vehiculo ${id} eliminado`;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CarServices;
