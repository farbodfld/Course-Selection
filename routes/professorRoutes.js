const router = require("express").Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Professor:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         faculty:
 *           type: string
 *           description: The faculty of your Professor
 *         field:
 *           type: string
 *           description: The field of your Professor
 *         order:
 *           type: number
 *           description: The order of your Professor
 */

const professor_controller = require("../controller/professorController")

const tokenValidation = require("../middleware/tokenValidation")
router.use(tokenValidation)

// POST: CREATE PROFESSOR BY ADMIN
router.route("/professor").post(professor_controller.createProfessor)

// GET: GET LIST OF PROFESSORS BY ADMIN OR MANAGER
router.route("/professor").get(professor_controller.getProfessors)

// GET: GET PROFESSOR BY ID
router.route("/professor/:id").get(professor_controller.getProfessor)

// PUT: EDIT/UPDATE PROFESSOR PROFILE BY ADMIN OR HIMSELF
router.route("/professor/:id").put(professor_controller.updateProfessor)

// DELETE: DELETE PROFESSOR BY ID
router.route("/professor/:id").delete(professor_controller.deleteProfessor)

module.exports = router