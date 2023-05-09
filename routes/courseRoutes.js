const router = require("express").Router()

let course_controller = require("../controller/courseController")

let tokenValidation = require("../middleware/tokenValidation")
router.use(tokenValidation)

// POST: CREATE NEW COURSE BY EDUCATIONAL MANAGER
router.route("/course").post(course_controller.createCourse)

// GET: LIST OF COURSES
router.route("/course").get(course_controller.getCourses)

// GET: COURSE BY ID
router.route("/course/:id").get(course_controller.getCourse)

module.exports = router