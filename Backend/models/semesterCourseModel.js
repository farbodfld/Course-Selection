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
    },
    {
        timestamps: true,
    }
);

module.exports = approvedCourseSchema.discriminator('SemesterCourse', semesterCourseSchema);