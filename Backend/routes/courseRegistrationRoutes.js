/**
 * @swagger
 * components:
 *   schemas:
 *     register:
 *       type: object
 *       properties:
 *         termName:
 *           type: string
 *         selectedCoursesIds:
 *           type: array
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
 *   name: register
 * /api/student/register:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags: [register]
 *     responses:
 *       200:
 *         description: The list of the Terms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/register'
 *       401:
 *         description: Access token is missing or invalid
 *
 * /api/student/register/getregister:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/register'
 *     responses:
 *       200:
 *         description: The created Manager.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/register'
 *       500:
 *         description: Some server error
 *       401:
 *         description: Access token is missing or invalid
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     register_course:
 *       type: object
 *       properties:
 *         selectedCoursesIds:
 *           type: array
 *         termName:
 *           type: string
 *         studentNumber:
 *           type: String
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     accept_registeration:
 *       type: object
 *       properties:
 *         isApproved:
 *           type: Boolean
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
 *   name: register_course
 * /api/course/register/{id}:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags: [register_course]
 *     responses:
 *       200:
 *         description: The list of the Terms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/register_course'
 *       401:
 *         description: Access token is missing or invalid
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags: [register_course]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/register_course'
 *     responses:
 *       200:
 *         description: The created Manager.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/register_course'
 *       500:
 *         description: Some server error
 *       401:
 *         description: Access token is missing or invalid
 *
 * /api/course/{id}/registrations:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [register_course]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/register_course'
 *     responses:
 *       200:
 *         description: The created Manager.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/register_course'
 *       500:
 *         description: Some server error
 *       401:
 *         description: Access token is missing or invalid
 *
 * /api/registration/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags: [accept_registeration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/accept_registeration'
 *     responses:
 *       200:
 *         description: The created Manager.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/accept_registeration'
 *       500:
 *         description: Some server error
 *       401:
 *         description: Access token is missing or invalid
 */

const express = require("express");
const router = express.Router();

const { getRegReqs, createRegReq, addCourseToRegReq, deleteRegReqs, acceptRegistration } = require("../controller/courseRegistrationController");

const validateToken = require("../middleware/tokenValidation");

router.use(validateToken);

// MAKE PREREGISTERATION REQUEST FOR COURSE.
router.route("/student/register").post(createRegReq);

// SEE PREREGISTER COURSE LIST BY STUDENT.
router.route("/student/register/getregister").get(getRegReqs);


// PREREGISTER COURSE BY STUDENT.
router.route("/course/register/:id").post(addCourseToRegReq);

// SEE THE PREREGISTER COURSE LIST BY EDUCATIONAL MANAGER ASSISTANCE.
router.route("/course/:id/registrations").get(getRegReqs);

// DELETE: PREREGISTER COURSE.
router.route("/course/register/:id").get(deleteRegReqs);

//PUT: ACCEPT OR REFUSE THE REGISTRATION REQUEST.
router.route("/registration/:id").put(acceptRegistration);

module.exports = router;