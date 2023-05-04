const mongoose = require("mongoose");

const PetSchema = mongoose.Schema(
  {
    petType: {
      type: String,
      required: false,
    },
    breed: {
      type: String,
      required: false,
    },
    age: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
    petDescription: {
      type: String,
      required: false,
    },
    file: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pet", PetSchema);
