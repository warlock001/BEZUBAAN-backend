const PostAdoption = require("../controllers/PostAdoption");
const GetAdoption = require("../controllers/GetAdoption");
const DeleteAdoption = require("../controllers/DeleteAdoption");
const PutAdoption = require("../controllers/putAdoption");
const adoptionRouter = require("express").Router();

module.exports = (upload) => {
  adoptionRouter.post(
    "/adoption",
    upload.single("image"),
    async (req, res, next) => {
      PostAdoption.Execute(req, res, next);
    }
  );

  adoptionRouter.get("/adoption", async (req, res) => {
    GetAdoption.Execute(req, res);
  });

  adoptionRouter.delete("/adoption", async (req, res) => {
    DeleteAdoption.Execute(req, res);
  });

  adoptionRouter.put("/adoption", upload.single("image"), async (req, res, next) => {
    PutAdoption.Execute(req, res);
  });

  return adoptionRouter;
};
