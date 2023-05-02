const userSchema = require('./userModel')

module.exports = mongoose => {

    const StudentSchema = new mongoose.Schema({
        ...userSchema.obj,
        educationalLevel: String,
        entryYear: Number,
        incomingSemester: String,
        GPA: Number,
        faculty: String,
    })

    const Student = mongoose.model('Student', StudentSchema)
    
    return Student 
}