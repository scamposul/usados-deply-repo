const { DataTypes, Sequelize, UUIDV4 } = require("sequelize");
const db = require("../utils/database");

const Reviews = db.define("reviews", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },

  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      max: 5,
      min: 1,
    },
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  seller_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  car_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Reviews
