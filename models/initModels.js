const Cars = require("./cars.model");
const Messages = require("./messages.model");
const Reviews = require("./reviews.model");
const Users = require("./users.model");

const initModels = () => {
    Messages,
    Cars,
    Users,
    Reviews
};

module.exports = initModels; 