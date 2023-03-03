const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Venta de autos usados",
            version: "1.0.0"
        },
    },
    apis: [
        "./back/routes/user.routes.js",
        "./back/models/users.model.js",
        "./back/routes/car.routes.js",
        "./back/models/cars.model.js",
        "./back/routes/messages.routes.js",
        "./back/models/messages.model.js"
    ],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get("/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
    console.log(`Documentación disponible en https://usados-deploy-repo.onrender.com/docs`);
};

module.exports = { swaggerDocs };