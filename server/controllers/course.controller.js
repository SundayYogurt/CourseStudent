const Course = require("../models/course.model")
const courseController = {};

//create course
courseController.create = async (req, res) => {
    const { courseName, credits, courseType, semester } = req.body;

    if (!courseName || !credits || !courseType || !semester) {
        return res.status(400).send({ message: "Please provide all fields!" });
    }

    try {
        const course = await Course.findOne({ where: { courseName } }); // หรือ field ที่ต้องไม่ซ้ำ

        if (course) {
            return res.status(400).send({ message: "Course already exists!" });
        }

        const newCourse = await Course.create({ courseName, credits, courseType, semester}); // ไม่ส่ง courseID
        return res.status(201).send(newCourse);

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

module.exports = courseController;