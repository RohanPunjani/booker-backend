const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking.controller");

router.post("/api/book/", bookingController.createBooking);
router.get("/api/book/:id", bookingController.getBookingById);
router.put("/api/book/:id", bookingController.updateBooking);
router.get("/api/admin/book", bookingController.getAllBookings);
router.delete("/api/book/:id", bookingController.deleteBooking);

module.exports = router;
