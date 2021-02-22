const express = require("express");
const router = express.Router();
const ideController = require("../controllers/ide.controller");

// compile by source and path
router.post("/run", ideController.run);

// seperate compile by source or path

// router.post("/seperate", multer().array("files"), function (req, res) {
//   console.log("body: ", req.body.data.files);
//   console.log("files:", req.files);
//   return res.sendStatus(200);
// });
router.post("/seperate", ideController.seperate);

// compile by source and path
router.post("/submit", ideController.submit);

// testset by testsetId and filePath
router.post("/testset", ideController.testset);

// createlog by a set of testset result and task data
router.post("/create", ideController.create);
module.exports = router;
