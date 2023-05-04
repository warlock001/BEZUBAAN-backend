const PostAdoption = require("../controllers/PostAdoption");
const GetAdoption = require("../controllers/GetAdoption");
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

  return adoptionRouter;
};
