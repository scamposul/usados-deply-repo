const Users = require("../models/users.model");

class AuthServices {
  static async loginUser(email) {
    try {
      return await Users.findOne({ where: { email } });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthServices;
