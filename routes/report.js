const PostReport = require("../controllers/PostReport");



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



    return Router;

}