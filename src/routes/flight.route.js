const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flight.controller");

router.post("/api/flight/", flightController.createFlight);
router.get("/api/flight/", flightController.getFlights);
router.get("/api/flight/:id", flightController.getFlightById);
router.put("/api/flight/:id", flightController.updateFlight);
router.delete("/api/flight/:id", flightController.deleteFlight);

module.exports = router;
