const courseController = require("../controllers/course.controller")
const express = require("express")
const router = express.Router();

//POST http://localhost:3000/api/v1/course
router.post("/",courseController.create)
// router.get("/:id", courseController.getById)
// router.get("/", courseController.getAll)
// router.put("/:id", courseController.updateById)
// router.delete("/:id", courseController.deleteById)
module.exports = router