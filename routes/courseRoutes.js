const router = require("express").Router()

const course_controller = require("../controller/courseController")

const tokenValidation = require("../middleware/tokenValidation")
router.use(tokenValidation)

// POST: CREATE NEW COURSE BY EDUCATIONAL MANAGER
router.route("/course").post(course_controller.createCourse)

module.exports = router