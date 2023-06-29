const approvedCourseSchema = require('./approvedCourseModel');
const mongoose = require('mongoose');

const semesterCourseSchema = new mongoose.Schema(
    {
        classDateTime: Date,
        examDateTime: Date,
        examLocation: String,
        lecturer: String,
        capacity: Number,
        academicSemester: String,
        preregisteredStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    {
        timestamps: true,
    }
);

module.exports = approvedCourseSchema.discriminator('SemesterCourse', semesterCourseSchema);