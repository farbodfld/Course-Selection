const express = require("express");
const router = express.Router();

const { getPreregReqs, createPreregReq, addCourseToPreregReq } = require("../controller/courseRequestController");

const validateToken = require("../middleware/tokenValidation");

router.use(validateToken);

router.route("/student/preregister").post(createPreregReq).get(getPreregReqs);
router.route("/course/preregister/:id").post(addCourseToPreregReq);

module.exports = router;