const mongoose = require('mongoose')

const CourseRegistrationSchema = new mongoose.Schema(
    {
        studentId: String,
        termName: String,
        selectedCoursesIds: [String],
        isApproved: Boolean
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('CourseRegistration', CourseRegistrationSchema)