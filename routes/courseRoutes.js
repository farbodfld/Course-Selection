const router = require("express").Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Course
 *         courseName:
 *           type: date
 *           description: The courseName of your Course
 *         prerequisites:
 *           type: date
 *           description: The prerequisites of your Course
 *         corequirements:
 *           type: string
 *           description: The corequirements of your Course
 *         unit:
 *           type: string
 *           description: The unit of your Course
 *         classDateTime:
 *           type: date
 *           description: The classDateTime of your Course
 *         examDateTime:
 *           type: date
 *           description: The examDateTime of your Course
 *         examLocation:
 *           type: string
 *           description: The examLocation of your Course
 *         lecturer:
 *           type: string
 *           description: The lecturer of your Course
 *         capacity:
 *           type: number
 *           description: The capacity of your Course
 *         academicSemester:
 *           type: number
 *           description: The academicSemester of your Course
 */

let course_controller = require("../controller/courseController")

let tokenValidation = require("../middleware/tokenValidation")
router.use(tokenValidation)

// POST: CREATE NEW COURSE BY EDUCATIONAL MANAGER
router.route("/course").post(course_controller.createCourse)

// GET: LIST OF COURSES
router.route("/course").get(course_controller.getCourses)

// GET: COURSE BY ID
router.route("/course/:id").get(course_controller.getCourse)

// PUT: UPDATE COURSE INFORMATION
router.route("/course/:id").put(course_controller.updateCourse)

// DELETE: COURSE
router.route("/course/:id").delete(course_controller.deleteCourse)

module.exports = router