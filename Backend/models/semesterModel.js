const mongoose = require('mongoose');

const SemesterSchema = new mongoose.Schema(
    {
        name: String,
        courses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SemesterCourse',
        }],
        users: [{
            userNumber: Number,
            role: {
                type: String,
                enum: ["student", "professor"],
            },
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'users.role',
        }],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Semester', SemesterSchema);