const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^([\w-.]+@([\w-]+.)+[\w-]{2,4})?$/.test(value);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  fullName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  mobileNumber: {
    type: String,
    required: false,
    validate: {
      validator: function (value) {
        return `/^[0-9]+$/.test(value)`;
      },
      message: (props) => `${props.value} is not a valid mobile number!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: false,
    },
  ],
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);
