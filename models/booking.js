const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vet",
    required: true,
  },
  slot: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("booking", BookingSchema);
