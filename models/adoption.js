const mongoose = require("mongoose");

const AdoptionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
    },
    status: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    dialCode: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("adoption", AdoptionSchema);
