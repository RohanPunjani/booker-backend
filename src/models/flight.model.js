const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  fromLocation: {
    type: String,
    required: true,
  },
  toLocation: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  classType: {
    type: String,
    required: true,
    default: "Economy",
  },
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
