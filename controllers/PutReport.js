const Report = require("../models/report");
const axios = require("axios");


class ReportController {


    static async Execute(req, res) {
        const { rescuer } = req.body;
        const { id } = req.query;
        console.log(req.body)
        console.log(req.query)
        if (rescuer != undefined &&
            id != undefined &&
            id.match(/^[0-9a-fA-F]{24}$/)) {

            Report.findOneAndUpdate(
                { '_id': id },
                {
                    $set:
                    {
                        rescuer: rescuer,
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



        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }







    }


}

module.exports = ReportController;