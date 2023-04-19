const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();

const middlewares = require("./middlewares");
const userRoutes = require("./routes/user.route");
const flightRoutes = require("./routes/flight.route");
const bookingRoutes = require("./routes/booking.route");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(userRoutes);
app.use(flightRoutes);
app.use(bookingRoutes);
// app.use(postRoutes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
