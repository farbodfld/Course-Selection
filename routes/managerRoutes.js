const router = require("express").Router()

const manager_controller = require("../controller/managerController")

const tokenValidation = require("../middleware/tokenValidation")
router.use(tokenValidation)

// POST: CREATE MANAGER BY ADMIN
router.route("/manager").post(manager_controller.createManager)

// GET: GET LIST OF MANAGERS BY ADMIN OR HIMSELF
router.route("/manager").get(manager_controller.getManagers)

// GET: GET MANAGER BY ID
router.route("/manager/:id").get(manager_controller.getManager)

module.exports = router