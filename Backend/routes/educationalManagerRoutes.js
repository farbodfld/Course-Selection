/**
 * @swagger
 * components:
 *   schemas:
 *     Semester:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         courses:
 *           type: string
 *           description: List of courses.
 *         users:
 *           type: number
 *           description: List of student number.
 *         preregistration_courses:
 *           type: string
 *           description: List of pre-regist courses.
 *         registration_courses:
 *            type: string
 *            description: List of pre-regist courses.
 *         
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
 *   name: Semesters
 * /api/terms:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Semesters]
 *     responses:
 *       200:
 *         description: The list of the Terms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Semester'
 *       401:
 *         description: Access token is missing or invalid
 * /api/term:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags: [Semesters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Semesters'
 *     responses:
 *       200:
 *         description: The created Manager.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Semester'
 *       500:
 *         description: Some server error
 *       401:
 *         description: Access token is missing or invalid
 * 
 * /api/term/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get the Manager by id
 *     tags: [Semesters]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Semester id
 *     responses:
 *       200:
 *         description: The Semester response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Semester'
 *       404:
 *         description: The Semester was not found
 *       401:
 *         description: Access token is missing or invalid
 * 
 *   put:
 *    security:
 *      - bearerAuth: []
 *    summary: Update the Semester by the id
 *    tags: [Semesters]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Semester id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Semester'
 *    responses:
 *      200:
 *        description: The Semester was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Semester'
 *      404:
 *        description: The Semester was not found
 *      500:
 *        description: Some error happened
 *      401:
 *        description: Access token is missing or invalid
 * 
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Remove the Semester by id
 *     tags: [Semesters]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Semester id
 *
 *     responses:
 *       200:
 *         description: The Semester was deleted
 *       404:
 *         description: The Semester was not found
 *       401:
 *         description: Access token is missing or invalid
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Pre-Registeration Courses:
 *       type: object
 *       properties:
 *         preregistration_courses:
 *           type: string
 *         course:
 *           type: string
 *           description: List of courses.
 *         
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
 *   name: Pre-Registeration Courses
 * /api/term/{id}/preregistration_courses:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Pre-Registeration Courses]
 *     responses:
 *       200:
 *         description: The list of the Terms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pre-Registeration Courses'
 *       401:
 *         description: Access token is missing or invalid
 * /api/term/{id}/preregistration:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags: [Pre-Registeration Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pre-Registeration Courses'
 *     responses:
 *       200:
 *         description: The created Manager.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pre-Registeration Courses'
 *       500:
 *         description: Some server error
 *       401:
 *         description: Access token is missing or invalid
 * 
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Remove the Semester by id
 *     tags: [Pre-Registeration Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Semester id
 *
 *     responses:
 *       200:
 *         description: The Semester was deleted
 *       404:
 *         description: The Semester was not found
 *       401:
 *         description: Access token is missing or invalid
 *
 * /api/term/{id}/preregistrations:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Pre-Registeration Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pre-Registeration Courses'
 *     responses:
 *       200:
 *         description: The created Manager.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pre-Registeration Courses'
 *       500:
 *         description: Some server error
 *       401:
 *         description: Access token is missing or invalid
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Registeration Courses:
 *       type: object
 *       properties:
 *         registration_courses:
 *           type: string
 *         course:
 *           type: string
 *           description: Name of course.
 *         
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
 *   name: Registeration Courses
 * /api/term/{id}/registration_courses:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Registeration Courses]
 *     responses:
 *       200:
 *         description: The list of the Terms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Registeration Courses'
 *       401:
 *         description: Access token is missing or invalid
 * /api/term/{id}/registration:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags: [Registeration Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Registeration Courses'
 *     responses:
 *       200:
 *         description: The created Manager.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Registeration Courses'
 *       500:
 *         description: Some server error
 *       401:
 *         description: Access token is missing or invalid
 * 
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Remove the Semester by id
 *     tags: [Registeration Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Semester id
 *
 *     responses:
 *       200:
 *         description: The Semester was deleted
 *       404:
 *         description: The Semester was not found
 *       401:
 *         description: Access token is missing or invalid
 *
 * /api/term/{id}/registrations:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Registeration Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Registeration Courses'
 *     responses:
 *       200:
 *         description: The created Manager.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Registeration Courses'
 *       500:
 *         description: Some server error
 *       401:
 *         description: Access token is missing or invalid
 */

const router = require("express").Router()
const educationalManagerController = require('../controller/educationalManagerController');
const { getPreregReqs, createPreregReq, addCourseToPreregReq } = require("../controller/courseRequestController");

const tokenValidation = require("../middleware/tokenValidation")

router.use(tokenValidation);

// GET: VIEW LIST OF ALL SEMESTERS
router.get('/terms', educationalManagerController.getSemesters);

// GET: VIEW INFORMATION OF A SEMESTER BY ID
router.get('/term/:id', educationalManagerController.getSemesterById);

// POST: CREATE A NEW SEMESTER
router.post('/term', educationalManagerController.createSemester);

// PUT: UPDATE A SEMESTER BY ID
router.put('/term/:id', educationalManagerController.updateSemester);

// DELETE: DELETE A SEMESTER BY ID
router.delete('/term/:id', educationalManagerController.deleteSemester);



// POST: ADD A COURSE TO PREREGISTRATION COURSE LIST FOR A SEMESTER
router.post('/term/:id/preregistration', educationalManagerController.addCourseToPreregistration);

// GET: VIEW PREREGISTRATION COURSE LIST FOR A SEMESTER
router.get('/term/:id/preregistration_courses', educationalManagerController.getPreregistrationCourseList);

// DELETE: REMOVE A COURSE FROM PREREGISTRATION COURSE LIST FOR A SEMESTER
router.delete('/term/:id/preregistration', educationalManagerController.removeCourseFromPreregistration);



// POST: ADD A COURSE TO REGISTRATION COURSE LIST FOR A SEMESTER
router.post('/term/:id/registration', educationalManagerController.addCourseToRegistration);

// GET: VIEW REGISTRATION COURSE LIST FOR A SEMESTER
router.get('/term/:id/registration_courses', educationalManagerController.getRegistrationCourseList);

// DELETE: REMOVE A COURSE FROM REGISTRATION COURSE LIST FOR A SEMESTER
router.delete('/term/:id/registration', educationalManagerController.removeCourseFromRegistration);



// GET: VIEW PREREGISTRATION LIST FOR COURSES IN A SEMESTER
router.get('/term/:id/preregistrations', educationalManagerController.getPreregistrations);

// GET: VIEW REGISTRATION LIST FOR COURSES IN A SEMESTER
router.get('/term/:id/registrations', educationalManagerController.getRegistrations);

// // GET: VIEW PREREGISTRATION LIST FOR A COURSE
// router.get('/course/:id/preregistrations', educationalManagerController.getPreregistrationsForCourse);

// // PUT: CONFIRM OR REJECT COURSE REGISTRATION OF A STUDENT
// router.put('/registration/:id', educationalManagerController.confirmOrRejectCourseRegistration);

module.exports = router;