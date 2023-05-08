const router = require("express").Router()

const professor_controller = require("../controller/professorController")

const tokenValidation = require("../middleware/tokenValidation")
router.use(tokenValidation)

router.route("/professor").post(professor_controller.createProfessor).get(professor_controller.getProfessor)

module.exports = router