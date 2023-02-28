// const { sequelize } = require('./database/models');
const app = require("./app");
const initModels = require("./models/initModels");
const db = require("./utils/database");

// const main = () => {
//   try {
//     sequelize
//       .sync({ logging: false })
//       .then(() => {
//         console.log('Database connected');
//         app.listen(app.get('port'), () => {
//           console.log(`Server listening at ${app.get('port')}`); // eslint-disable-line no-console
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

// main();

db.authenticate()
  .then(() => console.log("Authentication successful"))
  .catch((error) => console.log(error));
db.sync({ force: false })
  .then(() => {
    console.log("Database synchronized");
    app.listen(app.get("port"), () => {
      console.log(`Server listening at ${app.get("port")}`);
    });
  })
  .catch((error) => console.log(error));

initModels();
