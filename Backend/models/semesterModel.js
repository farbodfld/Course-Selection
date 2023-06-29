const mongoose = require('mongoose');

const SemesterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SemesterCourse',
    }],
    users: [{
        userNumber: {
            type: Number,
            required: true
        },
        role: {
            type: String,
            enum: ["student", "professor"],
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'users.role'
        }
    }],
    preregistration_courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ApprovedCourse'
    }],
    registration_courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseRegistration'
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Semester', SemesterSchema);