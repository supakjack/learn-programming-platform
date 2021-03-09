const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");


router.get('/', courseController.get)

router.get('/section/:id', courseController.getSection)

router.get('/StudentCourse/', courseController.getStudentCourse)

router.post('/', courseController.create)

router.put("/", courseController.update);

module.exports = router;
