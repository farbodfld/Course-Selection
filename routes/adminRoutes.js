const express = require("express")
const router = express.Router()

const adminObject = require("../controller/adminController")

router.route("/createAdmin").post(adminObject.creatAdmin)
router.route("/login").post(adminObject.login)

module.exports = router