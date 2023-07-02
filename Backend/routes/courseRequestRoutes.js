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
router.route("/course/preregister/:id").get(deletePreregReqs);

module.exports = router;