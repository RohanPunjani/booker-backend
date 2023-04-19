const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  guestCount: {
    type: Number,
    required: true,
  },
  classType: {
    type: String,
    required: true,
    default: "Economy",
  },
  payingOption: {
    type: String,
    required: true,
  },
  bookingStatus: {
    type: String,
    required: true,
    default: "booked", // booked/canceled
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  flightId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
    required: true,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
