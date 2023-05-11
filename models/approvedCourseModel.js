const mongoose = require("mongoose")

const approvedCourseSchema = new mongoose.Schema(
    {
        courseName: String,
        prerequisites: [String],
        corequirements: [String],
        unit: Number,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('ApprovedCourse', approvedCourseSchema)