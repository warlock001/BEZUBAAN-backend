const mongoose = require("mongoose");

const AdoptionRequestSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    adoption: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "adoption",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("adoptionRequest", AdoptionRequestSchema);
