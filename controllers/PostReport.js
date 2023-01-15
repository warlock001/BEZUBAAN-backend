const Report = require("../models/report");
const File = require("../models/file");
const { io, Socket } = require("../index")

class ReportController {

    static async Execute(req, res) {
        const { user, location } = req.body;


        if (user != undefined &&
            location != undefined &&
            req.file != undefined) {


            var final_file = {
                file: req.file.filename,
                contentType: req.file.mimetype,
                docOF: req.route.path,
            };

            File.create(final_file, function (err, result) {
                if (err) {
                    res.status(400).json({
                        message: `Error: ${err}`,
                    });
                } else {
                    Report.create(
                        {
                            user: user,
                            location: location,
                            file: result._id,
                        },
                        (err, response) => {
                            if (err) {
                                res.status(400).json({
                                    message: `Error: ${err}`,
                                });
                            } else {

                                res.status(200).json({
                                    message: `Report Generated.`,
                                });

                                Socket.broadcast.emit("hello", "world");

                            }
                        }
                    );

                }

            });

        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }







    }


}

module.exports = ReportController;