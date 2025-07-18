
const Student = require("../models/student.model")
const studentController = {};

//Create and save new student
studentController.create = async (req, res) => {
    const { studentID, firstName, lastName, gender, birthDate, email, phone, address, nationality, yearOfStudy } = req.body;
    //validate data
    if (!firstName || !lastName || !gender || !email) {
        res.status(400).send({ message: "studentID, firstName, lastName, gender, and email are required!" })
        return; // return error to client
    }
    await Student.findOne({ where: { email } }).then((student) => { //(student) รับค่ามาจาก FindOne ว่ามีค่าซ้ำไหม
        if (student) {
            return res.status(400).send({ message: "Student or email already exists!" })
        }
        const newStudent = {
            studentID, firstName, lastName, gender, birthDate, email, phone, address, nationality, yearOfStudy
        }

        Student.create(newStudent).then((data) => {
            res.send(data);
        }).catch((error) => {
            res.status(500).send({ message: error.message || "Something error while creating new student" })
        })
    })
}

// Get all students
studentController.getAll = async (req, res) => {
    try {
        const students = await Student.findAll();
        return res.send(students);
    } catch (error) {
        return res.status(500).send({ message: error.message || "Something went wrong while fetching students." })
    }
}

//get student bt ID
studentController.getById = async (req, res) => {
    const studentID = req.params.id;
    try {
        const students = await Student.findByPk(studentID);

        if (!students) {

            return res.status(404).send({ message: "Student not found with id" + studentID })
        }
        return res.send(students)


    } catch (error) {
        return res.status(500).send({ message: error.message || "Something went wrong while fetching student id." })
    }
};


//update student by id
studentController.updateById = async (req, res) => {
    const studentID = req.params.id;
    const { firstName, lastName, gender, birthDate, email, phone, address, nationality, yearOfStudy } = req.body;

    if (!firstName && !lastName && !gender && !birthDate && !email && !phone && !address && !nationality && !yearOfStudy) {
        return res.status(400).send({ message: "At least one field must be provided to update." })
    }
    try {
        const [updatedCount] = await Student.update(
            { firstName, lastName, gender, birthDate, email, phone, address, nationality, yearOfStudy },
            { where: { studentID } }
        );
        if (updatedCount === 1) {
            return res.send({ message: "Student updated successfully" })
        } else {
            return res.status(404).send({ message: "Student not found or no changes applied for ID: " + studentID });
        }
    } catch (error) {
        return res.status(500).send({ message: error.message || "Something went wrong while updating the student." })
    }
}

//delete by id
studentController.deleteById = async (req, res) => {
    const studentID = req.params.id;
    // ถ้าไม่มี studentID ที่จะลบ ส่งกลับว่า error (bad request)
    if (!studentID) {
        return res.status(400).send({ message: "Student ID is require for deletion." })
    }

    try {
        // ลองลบข้อมูลนักเรียนจากตาราง
        const deletedCount = await Student.destroy({ where: { studentID } });

        if (deletedCount === 1) {
            // ถ้าลบได้ 1 แถว แปลว่าลบสำเร็จ
            return res.send({ message: "Student deleted successfully." });
        } else {
            // ถ้าลบไม่ได้ (เช่น ไม่มี studentID นี้ในระบบ)
            return res.status(404).send({ message: "Student not found with ID: " + studentID });
        }
    } catch (error) {
        // ถ้ามี error (เช่น DB ล่ม หรือ syntax error) ส่ง error กลับ
        return res.status(500).send({ message: error.message || "Something went wrong while deleting the student." });
    }
}



module.exports = studentController;