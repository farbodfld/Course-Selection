const Term = require('../models/semesterModel');

const getAllTerms = async (req, res) => {
    try {
        const terms = await Term.find();
        console.log(terms);
        res.status(200).json(terms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getPreregistrationCoursesForTerm = async (req, res) => {
    const termId = req.params.id;
    try {
        const term = await Term.findById(termId);
        if (!term) {
            return res.status(404).json({ message: 'Term not found' });
        }
        const preregistrationCourses = term.preregistration_courses;
        res.status(200).json(preregistrationCourses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const preregisterForCourse = async (req, res) => {
    const courseId = req.params.id;
    // Get student id from authentication middleware
    const studentId = req.user.id;
    const termId = req.body.termId;
    try {
        const term = await Term.findById(termId);
        if (!term) {
            return res.status(404).json({ message: 'Term not found' });
        }
        const course = term.preregistration_courses.find(c => c.id === courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        if (!course.available_slots) {
            return res.status(400).json({ message: 'No available slots' });
        }
        if (course.students.includes(studentId)) {
            return res.status(400).json({ message: 'Already preregistered for this course' });
        }
        course.students.push(studentId);
        course.available_slots--;
        await term.save();
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const cancelPreregistration = async (req, res) => {
    const courseId = req.params.id;
    // Get student id from authentication middleware
    const studentId = req.user.id;
    const termId = req.body.termId;
    try {
        const term = await Term.findById(termId);
        if (!term) {
            return res.status(404).json({ message: 'Term not found' });
        }
        const course = term.preregistration_courses.find(c => c.id === courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        const index = course.students.indexOf(studentId);
        if (index === -1) {
            return res.status(400).json({ message: 'Not preregistered for this course' });
        }
        course.students.splice(index, 1);
        course.available_slots++;
        await term.save();
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getPreregistrationsForTerm = async (req, res) => {
    const termId = req.params.id;
    try {
        const term = await Term.findById(termId);
        if (!term) {
            return res.status(404).json({ message: 'Term not found' });
        }
        const preregistrations = term.preregistration_courses.map(course => {
            return {
                course_name: course.name,
                students: course.students
            }
        });
        res.status(200).json(preregistrations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getRegistrationCoursesForTerm = async (req, res) => {
    const termId = req.params.id;
    try {
        const term = await Term.findById(termId);
        if (!term) {
            return res.status(404).json({ message: 'Term not found' });
        }
        const registrationCourses = term.registration_courses;
        res.status(200).json(registrationCourses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const registerForCourse = async (req, res) => {
    const courseId = req.params.id;
    // Get student id from authentication middleware
    const studentId = req.user.id;
    const termId = req.body.termId;
    try {
        const term = await Term.findById(termId);
        if (!term) {
            return res.status(404).json({ message: 'Term not found' });
        }
        const course = term.registration_courses.find(c => c.id === courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        if (!course.available_slots) {
            return res.status(400).json({ message: 'No available slots' });
        }
        if (course.students.includes(studentId)) {
            return res.status(400).json({ message: 'Already registered for this course' });
        }
        course.students.push(studentId);
        course.available_slots--;
        await term.save();
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const cancelRegistration = async (req, res) => {
    const courseId = req.params.id;
    // Get student id from authentication middleware
    const studentId = req.user.id;
    const termId = req.body.termId;
    try {
        const term = await Term.findById(termId);
        if (!term) {
            return res.status(404).json({ message: 'Term not found' });
        }
        const course = term.registration_courses.find(c => c.id === courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        const index = course.students.indexOf(studentId);
        if (index === -1) {
            return res.status(400).json({ message: 'Not registered for this course' });
        }
        course.students.splice(index, 1);
        course.available_slots++;
        await term.save();
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getRegistrationsForTerm = async (req, res) => {
    const termId = req.params.id;
    // Get student id from authentication middleware
    const studentId = req.user.id;
    try {
        const term = await Term.findById(termId);
        if (!term) {
            return res.status(404).json({ message: 'Term not found' });
        }
        const registrations = term.registration_courses.map(course => {
            const isRegistered = course.students.includes(studentId);
            return {
                course_name: course.name,
                registered: isRegistered
            }
        });
        res.status(200).json(registrations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllTerms,
    getPreregistrationCoursesForTerm,
    preregisterForCourse,
    cancelPreregistration,
    getPreregistrationsForTerm,
    getRegistrationCoursesForTerm,
    registerForCourse,
    cancelRegistration,
    getRegistrationsForTerm,
};