module.exports = mongoose => {

    const approvedCourseSchema = new mongoose.Schema({
        courseName: String,
        prerequisites: [String],
        corequirements: [String],
        unit: Number,
    })

    const ApprovedCourse = mongoose.model('ApprovedCourse', approvedCourseSchema);    
    return ApprovedCourse
}