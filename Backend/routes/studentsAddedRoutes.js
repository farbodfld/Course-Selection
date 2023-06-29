const express = require('express');
const router = express.Router();

const termController = require('../controller/termController');

router.get('/terms', termController.getAllTerms);
router.get('/term/:id/preregistration_courses', termController.getPreregistrationCoursesForTerm);
router.post('/course/preregister/:id', termController.preregisterForCourse);
router.delete('/course/preregister/:id', termController.cancelPreregistration);
router.get('/term/:id/preregistrations', termController.getPreregistrationsForTerm);
router.get('/term/:id/registration_courses', termController.getRegistrationCoursesForTerm);
router.post('/course/register/:id', termController.registerForCourse);
router.delete('/course/register/:id', termController.cancelRegistration);
router.get('/term/:id/registrations', termController.getRegistrationsForTerm);

module.exports = router;