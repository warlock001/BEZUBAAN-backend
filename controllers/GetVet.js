const Vet = require("../models/vet");

class GetVetController {
  static async Execute(req, res) {
    const { id } = req.query;

    if (id != undefined && id.match(/^[0-9a-fA-F]{24}$/)) {
      var vet = await Vet.find({
        _id: id,
      });

      if (vet && vet.length > 0) {
        res.status(200).json({
          message: "Sucess",
          vet: vet,
        });
      } else {
        res.status(200).json({
          message: "No Record found",
        });
      }
    } else {
      var vet = await Vet.find();

      if (vet && vet.length > 0) {
        res.status(200).json({
          message: "Sucess",
          vet: vet,
        });
      } else {
        res.status(200).json({
          message: "No Record found",
        });
      }
    }
  }
}

module.exports = GetVetController;
