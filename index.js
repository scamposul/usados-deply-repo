// const { sequelize } = require('./database/models');
const app = require("./app");
const initModels = require("./models/initModels");
const { swaggerDocs } = require("./swagger");
const db = require("./utils/database");

db.authenticate()
  .then(() => console.log("Authentication successful"))
  .catch((error) => console.log(error));
db.sync({ force: false })
  .then(() => {
    console.log("Database synchronized");
    app.listen(app.get("port"), () => {
      console.log(`Server listening at ${app.get("port")}`);
      swaggerDocs(app);
    });
  })
  .catch((error) => console.log(error));

initModels();
