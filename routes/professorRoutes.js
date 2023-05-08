const router = require("express").Router()

const professor_controller = require("../controller/professorController")

const tokenValidation = require("../middleware/tokenValidation")
router.use(tokenValidation)

// CREATE PROFESSOR BY ADMIN
router.route("/professor").post(professor_controller.createProfessor)

// GET LIST OF PROFESSORS BY ADMIN OR MANAGER
router.route("/professor").get(professor_controller.getProfessors)

// GET PROFESSOR BY ID
router.route("/professor/:id").get(professor_controller.getProfessor)

module.exports = router