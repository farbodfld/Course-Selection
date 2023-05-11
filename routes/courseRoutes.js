const router = require("express").Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Course
 *         courseName:
 *           type: date
 *           description: The courseName of your Course
 *         prerequisites:
 *           type: date
 *           description: The prerequisites of your Course
 *         corequirements:
 *           type: string
 *           description: The corequirements of your Course
 *         unit:
 *           type: string
 *           description: The unit of your Course
 *         classDateTime:
 *           type: date
 *           description: The classDateTime of your Course
 *         examDateTime:
 *           type: date
 *           description: The examDateTime of your Course
 *         examLocation:
 *           type: string
 *           description: The examLocation of your Course
 *         lecturer:
 *           type: string
 *           description: The lecturer of your Course
 *         capacity:
 *           type: number
 *           description: The capacity of your Course
 *         academicSemester:
 *           type: number
 *           description: The academicSemester of your Course
 */

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: The Course managing API
 * /api/course:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Lists of all the Courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: The list of the Courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       401:
 *         description: Access token is missing or invalid
 * 
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new Course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: The created Course.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       500:
 *         description: Some server error
 *       401:
 *         description: Access token is missing or invalid
 * 
 * /api/course/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get the Course by id
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Course id
 *     responses:
 *       200:
 *         description: The Course response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: The Course was not found
 *       401:
 *         description: Access token is missing or invalid
 * 
 *   put:
 *    security:
 *      - bearerAuth: []
 *    summary: Update the Course by the id
 *    tags: [Courses]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Course id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Course'
 *    responses:
 *      200:
 *        description: The Course was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Course'
 *      404:
 *        description: The Course was not found
 *      500:
 *        description: Some error happened
 *      401:
 *        description: Access token is missing or invalid
 * 
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Remove the Course by id
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Course id
 *
 *     responses:
 *       200:
 *         description: The Course was deleted
 *       404:
 *         description: The Course was not found
 *       401:
 *         description: Access token is missing or invalid
 */

let course_controller = require("../controller/courseController")

let tokenValidation = require("../middleware/tokenValidation")
router.use(tokenValidation)

// POST: CREATE NEW COURSE BY EDUCATIONAL MANAGER
router.route("/course").post(course_controller.createCourse)

// GET: LIST OF COURSES
router.route("/course").get(course_controller.getCourses)

// GET: COURSE BY ID
router.route("/course/:id").get(course_controller.getCourse)

// PUT: UPDATE COURSE INFORMATION
router.route("/course/:id").put(course_controller.updateCourse)

// DELETE: COURSE
router.route("/course/:id").delete(course_controller.deleteCourse)

module.exports = router