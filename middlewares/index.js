const { authenticateUser } = require("./auth.middleware");
const { dataValidator } = require("./validator.middleware");

module.exports = {
  authenticateUser,
  dataValidator,
};
