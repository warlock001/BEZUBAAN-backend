const Report = require("../models/report");
const File = require("../models/file");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

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
                    var loc = JSON.parse(location)
                    axios.get(`https://us1.locationiq.com/v1/reverse?key=pk.8a577d1b155ce4938bc3dbe2b851c181&lat=${loc.latitude}&lon=${loc.longitude}&format=json`)
                        .then((response) => {
                            Report.create(
                                {
                                    user: user,
                                    location: location,
                                    status: "pending",
                                    file: result._id,
                                    address: response.data.display_name
                                }, async (err, resp) => {
                                    if (err) {
                                        res.status(400).json({
                                            message: `Error: ${err}`,
                                        });
                                    } else {
                                        res.status(200).json({
                                            message: `Report Generated.`,
                                        });
                                        var fileObt = fs.readFileSync(
                                            path.resolve(__dirname, `../${req.route.path}/${req.file.filename}`)
                                        );
                                        var bitmap = new Buffer(fileObt, "base64");

                                        io.emit("report", { location: response.data.display_name ? response.data.display_name : "no location", reportId: resp._id, image: Buffer.from(bitmap).toString("base64"), contentType: req.file.mimetype });
                                    }
                                }
                            )
                        })
                        .catch((e) => { console.log('network error') })






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