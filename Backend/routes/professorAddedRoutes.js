const express = require('express');
const router = express.Router();

const termController = require('../controller/termController');
const courseController = require('../controller/courseController');
const registrationController = require('../controller/registrationController');

router.get('/terms', termController.getAllTerms);
router.get('/term/:id/registrations', termController.getRegistrationsForTerm);
router.get('/course/:id/registrations', courseController.getRegistrationsForCourse);
router.put('/registration/:id', registrationController.updateRegistration);

module.exports = router;