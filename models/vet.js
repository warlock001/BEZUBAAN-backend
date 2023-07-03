const mongoose = require("mongoose");

const VetSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  countryCode: {
    type: String,
    required: false,
  },
  dialCode: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  profilePicture: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      required: false,
    },
  ],
});

module.exports = mongoose.model("Vet", VetSchema);
