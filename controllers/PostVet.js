const Vet = require("../models/vet");
const File = require("../models/file");

class VetController {
  static async Execute(req, res) {
    const {
      firstName,
      lastName,
      countryCode,
      dialCode,
      mobile,
      type,
      description,
    } = req.body;
    console.log(req.body);
    if (
      firstName &&
      lastName &&
      countryCode &&
      dialCode &&
      mobile &&
      type &&
      description &&
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
          Vet.create(
            {
              firstName: firstName,
              lastName: lastName,
              countryCode: countryCode,
              dialCode: dialCode,
              mobile: mobile,
              type: type,
              description: description,
              profilePicture: result._id,
            },
            async (err, response) => {
              if (err) {
                res.status(400).json({
                  message: `Error: ${err}`,
                });
              } else {
                res.status(200).json({
                  message: `Vet Saved.`,
                });
              }
            }
          );
        }
      });
    } else {
      console.log("here");
      res.status(400).json({
        message: `Invalid Request`,
      });
    }
  }
}

module.exports = VetController;
