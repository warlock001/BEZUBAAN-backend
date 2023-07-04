const Booking = require("../models/booking");
class AdoptionController {
  static async Execute(req, res) {
    const { vet, slot, date, id } = req.body;

    if (vet && slot && date && id) {
      Booking.create(
        {
          user: id,
          vet: vet,
          slot: slot,
          date: date,
        },
        async (err, response) => {
          if (err) {
            res.status(400).json({
              message: `Error: ${err}`,
            });
          } else {
            res.status(200).json({
              message: `Appointment Generated.`,
            });
          }
        }
      );
    } else {
      res.status(400).json({
        message: `Invalid Request`,
      });
    }
  }
}

module.exports = AdoptionController;
