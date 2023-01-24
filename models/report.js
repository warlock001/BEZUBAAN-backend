const mongoose = require("mongoose");

const ReportSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    rescuer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: false,
    },
    location: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    ETA: {
        type: String,
        required: false,
    },
    file: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        required: false,
    }
},
    { timestamps: true });

module.exports = mongoose.model("Report", ReportSchema);
