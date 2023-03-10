const PostReport = require("../controllers/PostReport");
const PutReport = require("../controllers/PutReport");
const GetReport = require("../controllers/GetReport");




const Router = require("express").Router();
const auth = require("../middleware/commonauth");

module.exports = (upload) => {

    Router.post(
        "/report",
        auth,
        upload.single("image"),
        async (req, res, next) => {
            PostReport.Execute(req, res, next);

        });


    Router.get(
        "/report",
        async (req, res, next) => {
            GetReport.Execute(req, res, next);
        });

    Router.put(
        "/updatereport",
        async (req, res, next) => {
            PutReport.Execute(req, res, next);

        });

    return Router;

}