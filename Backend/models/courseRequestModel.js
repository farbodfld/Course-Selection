const mongoose = require('mongoose')

const CourseRequestSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
        },
        courses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ApprovedCourse',
        }],
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('CourseRequest', CourseRequestSchema)