const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require('cors');
const path = require("path");

dotenv.config();


var bodyParser = require("body-parser");
const mongoose = require("mongoose");

const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const reportRouter = require("./routes/report");
const upload = require("./middleware/upload");

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(signupRouter);
app.use(loginRouter);
app.use(reportRouter(upload));

var server = app.listen(process.env.API_PORT, (error) => {
    if (error) {
        console.error("Error Occurred while connecting to server: ", error);
    } else {
        console.log("App is listining on port " + process.env.API_PORT);

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

var io = require("socket.io")(server)
const Socket =
    io.on("connection", function (socket) {
        return socket;
        console.log("Admin connected succesfully to the socket ...");
        Socket = socket;
        if (socket.handshake.headers.role === "client") {
            console.log("Connected succesfully to the socket ...");
        } else {
            console.log("Admin connected succesfully to the socket ...");
        }


    });

module.exports = { io, Socket };


