const express = require("express");
const router = express.Router();
const problemController = require("../controllers/problem.controller");

// compile by source and path
router.post("/assess", problemController.assess);

// Get problem by condition
router.get("/", problemController.get);

// Get problem by condition
router.post("/problem/user", problemController.getUserAssignment);

// Get problem by condition
router.post("/score/user", problemController.getScoreUser);

// Get problem by condition
router.post("/score/max", problemController.getMaxScore);

// Get problem by condition
router.post("/edit/hashtag", problemController.editHashtag);

// Get problem by condition
router.post("/edit/testset", problemController.editTestset);

// Get problem by condition
router.post("/edit/picture", problemController.editPicture);

// delete a problem by condition
router.patch("/", problemController.update);

// update a problem by condition
router.patch("/updateProblem", problemController.updateProblem);

// insert problem
router.post("/", problemController.create);

// delete problem
router.post("/delete", problemController.deleteAnother);
module.exports = router;
