const studentController = require("../controllers/student.controller")
const express = require("express")
const router = express.Router();

//POST http://localhost:3000/api/v1/student
router.post("/",studentController.create)
router.get("/:id", studentController.getById)
router.get("/", studentController.getAll)
router.put("/:id", studentController.updateById)
router.delete("/:id", studentController.deleteById)
module.exports = router