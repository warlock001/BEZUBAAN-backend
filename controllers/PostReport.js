const Report = require("../models/report");
const File = require("../models/file");
const axios = require("axios");


class ReportController {


    static async Execute(req, res) {
        const { user, location } = req.body;
        let io = req.app.get("io")

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
                            status: "pending",
                            file: result._id,
                        },
                        async (err, response) => {
                            if (err) {
                                res.status(400).json({
                                    message: `Error: ${err}`,
                                });
                            } else {

                                res.status(200).json({
                                    message: `Report Generated.`,
                                });
                                var loc = JSON.parse(location)
                                const Location = await axios.get(`https://us1.locationiq.com/v1/reverse?key=pk.8a577d1b155ce4938bc3dbe2b851c181&lat=${loc.latitude}&lon=${loc.longitude}&format=json`).catch((e) => { console.log('network error') });
                                io.emit("report", { location: Location?.data.display_name ? Location.data.display_name : "no location", reportId: response._id });

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