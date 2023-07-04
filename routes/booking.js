const PostBooking = require("../controllers/PostBooking");
const GetBooking = require("../controllers/GetBooking");
const bookingRouter = require("express").Router();

bookingRouter.post("/booking", async (req, res) => {
  PostBooking.Execute(req, res);
});

bookingRouter.get("/booking", async (req, res) => {
  GetBooking.Execute(req, res);
});

module.exports = bookingRouter;
