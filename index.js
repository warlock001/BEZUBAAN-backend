const express = require("express");
const app = express();
const dotenv = require("dotenv");
var cors = require("cors");
const path = require("path");

dotenv.config();

const corsOptions = {
    origin: "*",
};

app.use(cors(corsOptions));

var bodyParser = require("body-parser");
const mongoose = require("mongoose");

const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(signupRouter);
app.use(loginRouter);

app.use(cors(corsOptions, { credentials: true, origin: true }));

var server = app.listen(process.env.API_PORT, (error) => {
    if (error) {
        console.error("Error Occurred while connecting to server: ", error);
    } else {
        console.log("Connected to Server Successfully!");

        console.log("Trying to connect to database server...");

        mongoose.connect(process.env.DB_CONNECTION_STRING, (dbError) => {
            if (dbError) {
                console.error("Error Occurred while connecting to database: ", dbError);
            } else {
                console.log("Connected to Database Successfully!");
            }
        });
    }
});