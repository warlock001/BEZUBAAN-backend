// SET STORAGE


const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
});

var Delete = multer({ storage: storage });



module.exports = Delete;