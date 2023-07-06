const Adoption = require("../models/adoption");

class DeleteAdoptionController {
    static async Execute(req, res) {
        const { id, user } = req.query;

        if (id != undefined && id.match(/^[0-9a-fA-F]{24}$/)) {
            var adoption = await Adoption.deleteOne({
                _id: id,
            })

            console.log(adoption)

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
            res.status(400).json({
                message: `Invalid Request`,
            });
        }
    }
}

module.exports = DeleteAdoptionController;
