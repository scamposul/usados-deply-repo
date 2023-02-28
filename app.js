const createError = require("http-errors");
const express = require("express");
//const path = require('path');
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const carsRouter = require("./routes/car.routes");
const messagesRouter = require("./routes/messages.routes");
const userRouter = require("./routes/user.routes");
const reviewsRouter = require("./routes/reviews.routes");

const config = require("./config/config");

const app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use("/vehicles", carsRouter);
app.use("/users", userRouter);
app.use("/messages", messagesRouter);
app.use('/reviews', reviewsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || err;
  res.status(status).json({ message });
});

app.set("port", config.port);

module.exports = app;
