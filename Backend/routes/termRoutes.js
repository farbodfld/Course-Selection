const router = require("express").Router()

let term_controller = require("../controller/termController")

let tokenValidation = require("../middleware/tokenValidation")
router.use(tokenValidation)

// POST: CREATE NEW TERM BY Educational Assistant
router.route("/term").post(term_controller.createTerm)

// GET: LIST OF TERMS
router.route("/terms").get(term_controller.getTerms)

// GET: TERM BY ID
router.route("/term/:id").get(term_controller.getTerm)

// PUT: UPDATE TERM INFORMATION
router.route("/term/:id").put(term_controller.updateTerm)

// DELETE: TERM
router.route("/term/:id").delete(term_controller.deleteTerm)

// GET: LIST OF PREREGISTRATION COURSES OF TERM
router.route("/term/:id/preregistration_courses").get(term_controller.getPreregistrationCourses)

module.exports = router