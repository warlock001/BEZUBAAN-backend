const Pet = require("../models/pet")
const File = require("../models/file");

class UpdateAdoptionController {
    static async Execute(req, res) {
        const { id } = req.query;
        const { petType, breed, age, color, petDescription, phone, dialCode, UserId } =
            req.body;
        var image = {};

        if (req.file) {
            console.log(1)
            var final_file = {
                file: req.file.filename,
                contentType: req.file.mimetype,
                docOF: req.route.path,
            };

            File.create(final_file).then(result => {
                console.log(2)
                Pet.findOneAndUpdate(
                    { '_id': id },
                    {
                        $set:
                        {
                            petType: petType,
                            breed: breed,
                            age: age,
                            color: color,
                            petDescription: petDescription,
                            file: result._id,
                        }
                    },
                    { upsert: true },
                    (err, response) => {
                        if (err) {
                            console.log(err)
                        } else {
                            res.status(200).json({
                                message: `Adoption Updated.`,
                            });
                        }
                    })
            }).catch(err => {
                console.log(err)
            })
        } else {
            Pet.findOneAndUpdate(
                { '_id': id },
                {
                    $set:
                    {
                        petType: petType,
                        breed: breed,
                        age: age,
                        color: color,
                        petDescription: petDescription,
                        file: image._id,
                    }
                },
                { upsert: true },
                (err, response) => {
                    if (err) {
                        console.log(err)
                    } else {
                        res.status(200).json({
                            message: `Adoption Updated.`,
                        });
                    }
                })
        }




    }
}


module.exports = UpdateAdoptionController;
