const router = require("express").Router()
const educationalManagerController = require('../controller/educationalManagerController');
const tokenValidation = require("../middleware/tokenValidation")

router.use(tokenValidation);

// GET: VIEW LIST OF ALL SEMESTERS
router.get('/terms', educationalManagerController.getSemesters);

// GET: VIEW INFORMATION OF A SEMESTER BY ID
router.get('/term/:id', educationalManagerController.getSemesterById);

// POST: CREATE A NEW SEMESTER
router.post('/term', educationalManagerController.createSemester);

// PUT: UPDATE A SEMESTER BY ID
router.put('/term/:id', educationalManagerController.updateSemester);

// DELETE: DELETE A SEMESTER BY ID
router.delete('/term/:id', educationalManagerController.deleteSemester);



// POST: ADD A COURSE TO PREREGISTRATION COURSE LIST FOR A SEMESTER
router.post('/term/:id/preregistration', educationalManagerController.addCourseToPreregistration);

// GET: VIEW PREREGISTRATION COURSE LIST FOR A SEMESTER
router.get('/term/:id/preregistration_courses', educationalManagerController.getPreregistrationCourseList);

// DELETE: REMOVE A COURSE FROM PREREGISTRATION COURSE LIST FOR A SEMESTER
router.delete('/term/:id/preregistration', educationalManagerController.removeCourseFromPreregistration);



// POST: ADD A COURSE TO REGISTRATION COURSE LIST FOR A SEMESTER
router.post('/term/:id/registration', educationalManagerController.addCourseToRegistration);

// GET: VIEW REGISTRATION COURSE LIST FOR A SEMESTER
router.get('/term/:id/registration_courses', educationalManagerController.getRegistrationCourseList);

// DELETE: REMOVE A COURSE FROM REGISTRATION COURSE LIST FOR A SEMESTER
router.delete('/term/:id/registration', educationalManagerController.removeCourseFromRegistration);

// GET: VIEW PREREGISTRATION LIST FOR COURSES IN A SEMESTER
router.get('/term/:id/preregistrations', educationalManagerController.getPreregistrationCourseList);

// GET: VIEW PREREGISTRATION LIST FOR A COURSE
router.get('/course/:id/preregistrations', educationalManagerController.getPreregistrationsForCourse);

// PUT: CONFIRM OR REJECT COURSE REGISTRATION OF A STUDENT
router.put('/registration/:id', educationalManagerController.confirmOrRejectCourseRegistration);

module.exports = router;