const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { authenticate } = require("./authenticate");

router.post("/api/login", userController.login);
router.get("/api/admin/users", userController.getAllUsers);
router.post("/api/register", userController.register);
router.get("/api/user/profile", authenticate, userController.getUserProfile);
router.get(
  "/api/user/flights",
  authenticate,
  userController.getUserBookedFlights
);

module.exports = router;
