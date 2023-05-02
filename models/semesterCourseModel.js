const approvedCourseSchema = require('./approvedCourseModel')

module.exports = mongoose => {

    const semesterCourseSchema = new mongoose.Schema({
        ...approvedCourseSchema.obj,
        classDateTime: Date,
        examDateTime: Date,
        examLocation: String,
        lecturer: String,
        capacity: Number,
        academicSemester: String,
    })

    const SemesterCourse = mongoose.model('SemesterCourse', semesterCourseSchema);
    return SemesterCourse
}