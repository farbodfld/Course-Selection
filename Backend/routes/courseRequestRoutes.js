/**
 * @swagger
 * components:
 *   schemas:
 *     preregister:
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
 *   name: preregister
 * /api/student/preregister:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags: [preregister]
 *     responses:
 *       200:
 *         description: The list of the Terms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/preregister'
 *       401:
 *         description: Access token is missing or invalid
 *
 * /api/student/preregister/getPreregister:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [preregister]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/preregister'
 *     responses:
 *       200:
 *         description: The created Manager.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/preregister'
 *       500:
 *         description: Some server error
 *       401:
 *         description: Access token is missing or invalid
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     preregister_course:
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
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: preregister_course
 * /api/course/preregister/{id}:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags: [preregister_course]
 *     responses:
 *       200:
 *         description: The list of the Terms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/preregister_course'
 *       401:
 *         description: Access token is missing or invalid
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags: [preregister_course]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/preregister_course'
 *     responses:
 *       200:
 *         description: The created Manager.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/preregister_course'
 *       500:
 *         description: Some server error
 *       401:
 *         description: Access token is missing or invalid
 *
 * /api/course/{id}/preregistrations:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [preregister_course]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/preregister_course'
 *     responses:
 *       200:
 *         description: The created Manager.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/preregister_course'
 *       500:
 *         description: Some server error
 *       401:
 *         description: Access token is missing or invalid
 */

const express = require("express");
const router = express.Router();

const { getPreregReqs, createPreregReq, addCourseToPreregReq, deletePreregReqs } = require("../controller/courseRequestController");

const validateToken = require("../middleware/tokenValidation");

router.use(validateToken);

// MAKE PREREGISTERATION REQUEST FOR COURSE.
router.route("/student/preregister").post(createPreregReq);

// SEE PREREGISTER COURSE LIST BY STUDENT.
router.route("/student/preregister/getPreregister").get(getPreregReqs);


// PREREGISTER COURSE BY STUDENT.
router.route("/course/preregister/:id").post(addCourseToPreregReq);

// SEE THE PREREGISTER COURSE LIST BY EDUCATIONAL MANAGER ASSISTANCE.
router.route("/course/:id/preregistrations").get(getPreregReqs);

// DELETE: PREREGISTER COURSE.
router.route("/course/preregister/:id").delete(deletePreregReqs);

module.exports = router;