const Flight = require("../models/flight.model");

// Create a new flight
async function createFlight(req, res) {
  try {
    const flight = new Flight(req.body);
    await flight.save();
    res
      .status(201)
      .json({ flight: flight, message: "Flight Created Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

// Get all flights
async function getFlights(req, res) {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

// Get a single flight by ID
async function getFlightById(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).send("Flight not found");
    }
    res.json(flight);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

// Update a flight by ID
async function updateFlight(req, res) {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!flight) {
      return res.status(404).send("Flight not found");
    }
    res.json(flight);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

// Delete a flight by ID
async function deleteFlight(req, res) {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);
    if (!flight) {
      return res.status(404).send("Flight not found");
    }
    res.json(flight);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

module.exports = {
  createFlight,
  getFlights,
  getFlightById,
  updateFlight,
  deleteFlight,
};
