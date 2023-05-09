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

// PUT: UPDATE MANAGER BY ID
router.route("/manager/:id").put(manager_controller.updateManager)

//DELETE: DELETE MANAGER
router.route("/manager/:id").delete(manager_controller.deleteManager)

module.exports = router