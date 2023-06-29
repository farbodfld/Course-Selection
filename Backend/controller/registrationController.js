const Term = require('../models/semesterModel');

const updateRegistration = async (req, res) => {
    const registrationId = req.params.id;
    const status = req.body.status;
    // Get student id from authentication middleware
    const studentId = req.user.id;
    try {
        const term = await Term.findOne({
            $or: [
                { "preregistration_courses.students": studentId },
                { "registration_courses.students": studentId }
            ]
        });
        if (!term) {
            return res.status(404).json({ message: 'Registration not found' });
        }
        let course, isPreregistration;
        if (term.preregistration_courses.some(c => c.students.includes(studentId))) {
            course = term.preregistration_courses.find(c => c.students.includes(studentId));
            isPreregistration = true;
        } else {
            course = term.registration_courses.find(c => c.students.includes(studentId));
            isPreregistration = false;
        }
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        const index = course.students.indexOf(studentId);
        if (index === -1) {
            return res.status(400).json({ message: 'Not registered for this course' });
        }
        if (status === 'approved') {
            if (isPreregistration) {
                // Move student from preregistration to registration
                course.students.splice(index, 1);
                course.available_slots++;
                term.registration_courses.push(course);
                term.preregistration_courses.splice(term.preregistration_courses.indexOf(course), 1);
            }
            res.status(200).json({ message: 'Registration approved' });
        } else if (status === 'rejected') {
            // Remove student from course
            course.students.splice(index, 1);
            course.available_slots++;
            await term.save();
            res.status(200).json({ message: 'Registration rejected' });
        } else {
            return res.status(400).json({ message: 'Invalid status' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    updateRegistration,
};