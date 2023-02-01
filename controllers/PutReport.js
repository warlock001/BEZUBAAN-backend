const Report = require("../models/report");
const axios = require("axios");


class ReportController {


    static async Execute(req, res) {
        const { rescuer, ETA, status } = req.body;
        const { id } = req.query;
        console.log(req.body)
        console.log(req.query)
        if (rescuer != undefined &&
            id != undefined &&
            id.match(/^[0-9a-fA-F]{24}$/)) {

            const report = await Report.findOne({ _id: id });


            if (ETA != undefined) {
                console.log("in here")
                Report.findOneAndUpdate(
                    { '_id': id },
                    {
                        $set:
                        {
                            rescuer: rescuer,
                            ETA: ETA
                        }
                    },
                    { upsert: true },
                    (err, response) => {
                        if (err) {
                            res.status(400).json({
                                message: `Error: ${err}`,
                            });
                        } else {
                            res.status(200).json({
                                message: `Report Updated.`,
                            });
                        }
                    });


            } else if (status != undefined) {
                Report.findOneAndUpdate(
                    { '_id': id },
                    {
                        $set:
                        {
                            status: status
                        }
                    },
                    { upsert: true },
                    (err, response) => {
                        if (err) {
                            res.status(400).json({
                                message: `Error: ${err}`,
                            });
                        } else {
                            res.status(200).json({
                                message: `Report Updated.`,
                            });
                        }
                    });
            } else if (report.status == 'On Going') {
                res.status(409).json({
                    message: `Already Taken, Thanks for Considering`,
                });
            } else {
                Report.findOneAndUpdate(
                    { '_id': id },
                    {
                        $set:
                        {
                            rescuer: rescuer,
                            status: 'On Going'
                        }
                    },
                    { upsert: true },
                    (err, response) => {
                        if (err) {
                            res.status(400).json({
                                message: `Error: ${err}`,
                            });
                        } else {
                            res.status(200).json({
                                message: `Report Updated.`,
                            });
                        }
                    });
            }





        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }







    }


}

module.exports = ReportController;