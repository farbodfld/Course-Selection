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
 *           description: The auto-generated id of the book
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

const userObject = require("../controller/userController")

router.route("/createAdmin").post(userObject.creatAdmin)
router.route("/login").post(userObject.login)

module.exports = router