const express = require("express")
const router = express.Router()

const userObject = require("../controller/userController")

router.route("/createAdmin").post(userObject.creatAdmin)
router.route("/login").post(userObject.login)

module.exports = router