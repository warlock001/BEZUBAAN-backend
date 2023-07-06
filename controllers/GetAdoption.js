const Adoption = require("../models/adoption");

class GetAdoptionController {
  static async Execute(req, res) {
    const { id, user } = req.query;

    if (id != undefined && id.match(/^[0-9a-fA-F]{24}$/)) {
      var adoption = await Adoption.find({
        _id: id,
      }).populate({
        path: "pet",
      });

      if (adoption && adoption.length > 0) {
        res.status(200).json({
          message: "Sucess",
          adoption: adoption,
        });
      } else {
        res.status(200).json({
          message: "No Record found",
        });
      }
    } else if (user != undefined && user.match(/^[0-9a-fA-F]{24}$/)) {
      var adoption = await Adoption.find({
        user: user,
      }).populate({
        path: "pet",
      });

      if (adoption && adoption.length > 0) {
        res.status(200).json({
          message: "Sucess",
          adoption: adoption,
        });
      } else {
        res.status(200).json({
          message: "No Record found",
        });
      }
    } else {
      var adoption = await Adoption.find()
        .populate({
          path: "pet",
        })
        .populate({
          path: "user",
        });

      if (adoption && adoption.length > 0) {
        res.status(200).json({
          message: "Sucess",
          adoption: adoption,
        });
      } else {
        res.status(200).json({
          message: "No Record found",
        });
      }
    }
  }
}

module.exports = GetAdoptionController;
