const Report = require("../models/report");

class GetReportController {

    static async Execute(req, res) {

        const { id, user } = req.query;

        if (id != undefined && id.match(/^[0-9a-fA-F]{24}$/)) {
            var report = await Report.find({
                rescuer: id
            }).populate({
                path: 'user'
            });;

            if (report && report.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    report: report
                });

            } else {
                res.status(200).json({
                    message: "No Record found",
                });
            }


        } else if (user != undefined && user.match(/^[0-9a-fA-F]{24}$/)) {

            var report = await Report.find({
                user: user
            }).populate({
                path: 'rescuer'
            });

            if (report && report.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    report: report
                });

            } else {
                res.status(200).json({
                    message: "No Record found",
                });
            }

        } else {

            var report = await Report.find();

            if (report && report.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    report: report
                });

            } else {
                res.status(200).json({
                    message: "No Record found",
                });
            }
        }

    }
}

module.exports = GetReportController