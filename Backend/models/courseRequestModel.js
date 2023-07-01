const mongoose = require('mongoose')

const CourseRequestSchema = new mongoose.Schema(
    {
        studentId: String,
        termName: String,
        selectedCoursesIds: [String],
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('CourseRequest', CourseRequestSchema)