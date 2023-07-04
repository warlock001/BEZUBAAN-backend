const Booking = require("../models/booking");

class GetBookingController {
  static async Execute(req, res) {
    const { id } = req.query;

    if (id != undefined && id.match(/^[0-9a-fA-F]{24}$/)) {
      var booking = await Booking.find({
        vet: id,
      }).populate({
        path: 'user'
      });

      if (booking && booking.length > 0) {
        res.status(200).json({
          message: "Sucess",
          booking: booking,
        });
      } else {
        res.status(200).json({
          message: "No Record found",
        });
      }
    } else {
      var booking = await Booking.find();

      if (booking && booking.length > 0) {
        res.status(200).json({
          message: "Sucess",
          booking: booking,
        });
      } else {
        res.status(200).json({
          message: "No Record found",
        });
      }
    }
  }
}

module.exports = GetBookingController;
