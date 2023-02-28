const db = require('../utils/database');
const { DataTypes, Sequelize, UUIDV4 } = require('sequelize');

const Users = db.define('users', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  profileImage: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  verificationToken:{
    type: DataTypes.STRING
  },
  verified:{
    type: DataTypes.BOOLEAN,
    defaultValue:false
  }
});

module.exports = Users;
