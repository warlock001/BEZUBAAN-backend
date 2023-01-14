const mongoose = require("mongoose");

const ReportSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    location: {
        type: String,
        required: false,
    },
    file: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        required: false,
    },
},
    { timestamps: true });

module.exports = mongoose.model("Report", ReportSchema);
