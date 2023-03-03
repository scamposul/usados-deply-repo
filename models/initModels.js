const Cars = require("./cars.model");
const Messages = require("./messages.model");
const Reviews = require("./reviews.model");
const Users = require("./users.model");

const initModels = () => {
    Users.hasMany(Cars, { foreignKey: "seller_id" });
    Cars.belongsTo(Users, { foreignKey: "seller_id" });
  
    Users.hasMany(Messages, { foreign_key: "sender_id" });
    Messages.belongsTo(Users, { foreignKey: "sender_id" });
  
    Cars.hasMany(Messages, { foreignKey: "car_id" });
    Messages.belongsTo(Cars, { foreignKey: "car_id" });

    Users.hasMany(Reviews, { foreignKey: "seller_id" });
    Reviews.belongsTo(Users, { foreignKey: "seller_id" });

    Cars.hasMany(Reviews, { foreignKey: "car_id" });
    Reviews.belongsTo(Cars, {foreignKey: "car_id"});
};

module.exports = initModels; 