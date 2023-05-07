const router = require("express").Router();

const professor_controller = require("../controller/professorController");

router.route("/professor").post(professor_controller.createProfessor).get(professor_controller.getProfessor);

module.exports = router;