const PostVet = require("../controllers/PostVet");
const GetVet = require("../controllers/GetVet");
const vetRouter = require("express").Router();

module.exports = (upload) => {
  vetRouter.post("/vet", upload.single("image"), async (req, res, next) => {
    PostVet.Execute(req, res, next);
  });

  vetRouter.get("/vet", async (req, res) => {
    GetVet.Execute(req, res);
  });

  return vetRouter;
};
