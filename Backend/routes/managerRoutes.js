const router = require("express").Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Manager:
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
 *           description: The faculty of your Manager
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
 * tags:
 *   name: Managers
 *   description: The Manager managing API
 * /api/admin/manager:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Lists of all the Managers
 *     tags: [Managers]
 *     responses:
 *       200:
 *         description: The list of the Managers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Manager'
 *       401:
 *         description: Access token is missing or invalid
 * 
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new Manager
 *     tags: [Managers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Manager'
 *     responses:
 *       200:
 *         description: The created Manager.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Manager'
 *       500:
 *         description: Some server error
 *       401:
 *         description: Access token is missing or invalid
 * 
 * /api/admin/manager/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get the Manager by id
 *     tags: [Managers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Manager id
 *     responses:
 *       200:
 *         description: The Manager response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Manager'
 *       404:
 *         description: The Manager was not found
 *       401:
 *         description: Access token is missing or invalid
 * 
 *   put:
 *    security:
 *      - bearerAuth: []
 *    summary: Update the Manager by the id
 *    tags: [Managers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Manager id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Manager'
 *    responses:
 *      200:
 *        description: The Manager was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Manager'
 *      404:
 *        description: The Manager was not found
 *      500:
 *        description: Some error happened
 *      401:
 *        description: Access token is missing or invalid
 * 
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Remove the Manager by id
 *     tags: [Managers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Manager id
 *
 *     responses:
 *       200:
 *         description: The Manager was deleted
 *       404:
 *         description: The Manager was not found
 *       401:
 *         description: Access token is missing or invalid
 */

const manager_controller = require("../controller/managerController")

const tokenValidation = require("../middleware/tokenValidation")
router.use(tokenValidation)

// POST: CREATE MANAGER BY ADMIN
router.route("/manager").post(manager_controller.createManager)

// GET: GET LIST OF MANAGERS BY ADMIN OR HIMSELF
router.route("/manager").get(manager_controller.getManagers)

// GET: GET MANAGER BY ID
router.route("/manager/:id").get(manager_controller.getManager)

// PUT: UPDATE MANAGER BY ID
router.route("/manager/:id").put(manager_controller.updateManager)

//DELETE: DELETE MANAGER
router.route("/manager/:id").delete(manager_controller.deleteManager)

module.exports = router