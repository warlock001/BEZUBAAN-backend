const filesRouter = require("express").Router();
const GetFiles = require("../controllers/GetFiles");
// const DeleteFile = require("../controllers/DeleteFile");
const auth = require("../middleware/commonauth");

filesRouter.get("/files/:id/:client", auth, async (req, res) => {
  GetFiles.Execute(req, res);
});

// filesRouter.delete("/files/:id", auth, async (req, res) => {
//   DeleteFile.Execute(req, res);
// });

module.exports = filesRouter;
