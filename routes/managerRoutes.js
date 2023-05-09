const router = require("express").Router()

const manager_controller = require("../controller/managerController")

const tokenValidation = require("../middleware/tokenValidation")
router.use(tokenValidation)

// POST: CREATE MANAGER BY ADMIN
router.route("/manager").post(manager_controller.createManager)

module.exports = router