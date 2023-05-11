const router = require("express").Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Professor:
 *       type: object
 *       properties:
 *         firstname:
 *           type: string
 *           description: The firstname of the Professor
 *         surname:
 *           type: string
 *           description: The surname of your Professor
 *         userNumber:
 *           type: number
 *           description: The userNumber of your Professor
 *         password:
 *           type: string
 *           description: The password of your Professor
 *         email:
 *            type: string
 *            description: The email of your Professor
 *         mobilePhone:
 *           type: string
 *           description: The mobilePhone of your Professor
 *         role:
 *           type: string
 *           description: The role of your Professor
 *         faculty:
 *           type: string
 *           description: The faculty of your Professor
 *         field:
 *           type: string
 *           description: The field of your Professor
 *         order:
 *           type: string
 *           description: The order of your Professor
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * components:
 *   responses:
 *     UnauthorizedError:
 *       description: Access token is missing or invalid
 */

/**
 * @swagger
 * tags:
 *   name: Professors
 *   description: The Professor managing API
 * /api/admin/professor:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Lists of all the professors
 *     tags: [Professors]
 *     responses:
 *       200:
 *         description: The list of the Professors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Professor'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 * 
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new Professor
 *     tags: [Professors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Professor'
 *     responses:
 *       200:
 *         description: The created Professor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Professor'
 *       500:
 *         description: Some server error
 * 
 * /api/admin/professor/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get the Professor by id
 *     tags: [Professors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Professor id
 *     responses:
 *       200:
 *         description: The Professor response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Professor'
 *       404:
 *         description: The Professor was not found
 * 
 *   put:
 *    security:
 *      - bearerAuth: []
 *    summary: Update the Professor by the id
 *    tags: [Professors]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Professor id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Professor'
 *    responses:
 *      200:
 *        description: The Professor was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Professor'
 *      404:
 *        description: The Professor was not found
 *      500:
 *        description: Some error happened
 * 
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Remove the Professor by id
 *     tags: [Professors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Professor id
 *
 *     responses:
 *       200:
 *         description: The Professor was deleted
 *       404:
 *         description: The Professor was not found
 * 
 * /api/professor/{id}:
 *   put:
 *    security:
 *      - bearerAuth: []
 *    summary: Professor update his profile by the id
 *    tags: [Professors]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Professor id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Professor'
 *    responses:
 *      200:
 *        description: The Professor was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Professor'
 *      404:
 *        description: The Professor was not found
 *      500:
 *        description: Some error happened
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