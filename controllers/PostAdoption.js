const pet = require("../models/pet");
const adoption = require("../models/adoption");
const File = require("../models/file");

class AdoptionController {
  static async Execute(req, res) {
    const { petType, breed, age, color, petDescription, phone, dialCode, id } =
      req.body;

    if (
      petType &&
      breed &&
      age &&
      color &&
      petDescription &&
      phone &&
      dialCode &&
      id &&
      req.file
    ) {
      var final_file = {
        file: req.file.filename,
        contentType: req.file.mimetype,
        docOF: req.route.path,
      };

      File.create(final_file, function (err, result) {
        if (err) {
          res.status(400).json({
            message: `Error: ${err}`,
          });
        } else {
          pet.create(
            {
              petType: petType,
              breed: breed,
              age: age,
              color: color,
              petDescription: petDescription,
              file: result._id,
            },
            async (err, response) => {
              if (err) {
                res.status(400).json({
                  message: `Error: ${err}`,
                });
              } else {
                adoption.create(
                  {
                    user: id,
                    pet: response._id,
                    status: "available",
                    phone: phone,
                    dialCode: dialCode,
                  },
                  async (err, response) => {
                    if (err) {
                      res.status(400).json({
                        message: `Error: ${err}`,
                      });
                    } else {
                      res.status(200).json({
                        message: `Adoption Generated.`,
                      });
                    }
                  }
                );
              }
            }
          );
        }
      });
    } else {
      res.status(400).json({
        message: `Invalid Request`,
      });
    }
  }
}

module.exports = AdoptionController;
