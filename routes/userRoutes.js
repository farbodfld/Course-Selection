const express = require("express")
const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the User
 *         firstname:
 *           type: string
 *           description: The firstname of your user
 *         surname:
 *           type: string
 *           description: The surname of your user
 *         userNumber:
 *           type: number
 *           description: The userNumber of your user
 *         password:
 *           type: string
 *           description: The password of your user
 *         email:
 *           type: string
 *           description: The email of your user
 *         mobilePhone:
 *           type: string
 *           description: The mobilePhone of your user
 *         role:
 *           type: string
 *           description: The role of your user
 *     
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The Users managing API
 * /api/createAdmin:
 *   post:
 *     summary: Create a new User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created User.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 * /api/login:
 *   post:
 *     summary: Login User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User logedin.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

const userObject = require("../controller/userController")

router.route("/createAdmin").post(userObject.creatAdmin)
router.route("/login").post(userObject.login)

module.exports = router