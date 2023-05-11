const router = require("express").Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Student
 *         educationalLevel:
 *           type: string
 *           description: The educationalLevel of your Student
 *         entryYear:
 *           type: number
 *           description: The entryYear of your Student
 *         incomingSemester:
 *           type: number
 *           description: The incomingSemester of your Student
 *         GPA:
 *           type: number
 *           description: The GPA of your Student
 *         faculty:
 *           type: string
 *           description: The faculty of your Student
 */

const student_controller = require("../controller/studentController")

const tokenValidation = require("../middleware/tokenValidation")
router.use(tokenValidation)

// POST: CREATE NEW STUDENT BY ADMIN
router.route("/student").post(student_controller.createStudent)

// GET: GET LIST OF STUDENTS BY ADMIN OR MANAGER
router.route("/student").get(student_controller.getStudents)

// GET: GET STUDENT BY ID
router.route("/student/:id").get(student_controller.getStudent)

// PUT: UPDATE STUDENT PROFILE ADMIN OR HIMSELF
router.route("/student/:id").put(student_controller.updateStudent)

// DELETE: DELETE STUDENT BY ADMIN
router.route("/student/:id").delete(student_controller.deleteStudent)

module.exports = router