const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Booking = require("../models/booking.model");
const jwt = require("jsonwebtoken");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.register = async (req, res) => {
  try {
    const {
      email,
      fullName,
      address,
      mobileNumber,
      password,
      confirmPassword,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }

    const newUser = await User.create({
      email,
      fullName,
      address,
      mobileNumber,
      password,
      role: "user",
    });

    console.log(newUser);

    const token = jwt.sign(
      {
        userId: newUser._id,
        role: newUser.role,
      },
      process.env.SECRET
    );
    console.log(newUser, token);
    res.status(200).json({
      message: "User Created successful",
      token: token,
      role: newUser.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.SECRET
    );
    res.status(200).json({
      message: "Login successful",
      token: token,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile", error });
  }
};

exports.getUserBookedFlights = async (req, res) => {
  try {
    const userId = req.user.userId;
    const bookings = await Booking.find({
      userId,
    }).populate("flightId");
    res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
