const router = require("express").Router()

const student_controller = require("../controller/studentController")

const tokenValidation = require("../middleware/tokenValidation")
router.use(tokenValidation)

// POST: CREATE NEW STUDENT BY ADMIN
router.route("/student").post(student_controller.createStudent)

module.exports = router