const router = require("express").Router()

const student_controller = require("../controller/studentController")

const tokenValidation = require("../middleware/tokenValidation")
router.use(tokenValidation)

// POST: CREATE NEW STUDENT BY ADMIN
router.route("/student").post(student_controller.createStudent)

// GET: GET LIST OF STUDENTS BY ADMIN OR MANAGER
router.route("/student").get(student_controller.getStudents)

module.exports = router