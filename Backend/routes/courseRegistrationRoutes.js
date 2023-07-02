const express = require("express");
const router = express.Router();

const { getRegReqs, createRegReq, addCourseToRegReq, deleteRegReqs } = require("../controller/courseRegistrationController");

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

module.exports = router;