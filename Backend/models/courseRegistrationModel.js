const mongoose = require('mongoose')

const CourseRegistrationSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
        },
        courses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SemesterCourse',
        }],
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('CourseRegistration', CourseRegistrationSchema)