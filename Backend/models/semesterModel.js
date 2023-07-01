const mongoose = require('mongoose');

const SemesterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    courses: [String],
    users: [String],
    preregistration_courses: [String],
    registration_courses: [String],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Semester', SemesterSchema);