const db = require("../utils/database");
const { DataTypes, Sequelize, UUIDV4 } = require("sequelize");

const Messages = db.define("messages", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sender_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  car_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Messages;
