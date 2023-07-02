const router = require("express").Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
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
 *         educationalLevel:
 *           type: string
 *           description: The educationalLevel of your Student
 *         entryYear:
 *           type: number
 *           description: The entryYear of your Student
 *         incomingSemester:
 *           type: number
 *           description: The incomingSemester of your Student
 *         GPA:
 *           type: number
 *           description: The GPA of your Student
 *         faculty:
 *           type: string
 *           description: The faculty of your Student
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
 *   name: Students
 *   description: The Student managing API
 * /api/admin/student:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Lists of all the Students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: The list of the Students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 * 
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new Student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: The created Student.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       500:
 *         description: Some server error
 * 
 * /api/admin/student/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get the Student by id
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Student id
 *     responses:
 *       200:
 *         description: The Student response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: The Student was not found
 * 
 *   put:
 *    security:
 *      - bearerAuth: []
 *    summary: Update the Student by the id
 *    tags: [Students]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Student id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Student'
 *    responses:
 *      200:
 *        description: The Student was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Student'
 *      404:
 *        description: The Student was not found
 *      500:
 *        description: Some error happened
 * 
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Remove the Student by id
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Student id
 *
 *     responses:
 *       200:
 *         description: The Student was deleted
 *       404:
 *         description: The Student was not found
 * 
 * /api/student/{id}:
 *   put:
 *    security:
 *      - bearerAuth: []
 *    summary: Student update his profile by the id
 *    tags: [Students]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Student id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Student'
 *    responses:
 *      200:
 *        description: The Student was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Student'
 *      404:
 *        description: The Student was not found
 *      500:
 *        description: Some error happened
 */

const student_controller = require("../controller/studentController")
const educationalManagerController = require('../controller/educationalManagerController');

const tokenValidation = require("../middleware/tokenValidation")
router.use(tokenValidation)

// POST: CREATE NEW STUDENT BY ADMIN
router.route("/student").post(student_controller.createStudent)

// GET: GET LIST OF STUDENTS BY ADMIN OR MANAGER
router.route("/student").get(student_controller.getStudents)

// GET: GET STUDENT BY ID
router.route("/student/:id").get(student_controller.getStudent)

// PUT: UPDATE STUDENT PROFILE ADMIN OR HIMSELF
router.route("/student/:id").put(student_controller.updateStudent)

// DELETE: DELETE STUDENT BY ADMIN
router.route("/student/:id").delete(student_controller.deleteStudent)

// GET: LIST OF TERMS
router.get('/terms', educationalManagerController.getSemesters);

// GET: VIEW PREREGISTRATION COURSE LIST FOR A SEMESTER
router.get('/term/:id/preregistration_courses', educationalManagerController.getPreregistrationCourseList);

module.exports = router