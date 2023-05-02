const userSchema = require('./userModel')

module.exports = mongoose => {

    const EducationalManagerSchema = new mongoose.Schema({
        ...userSchema.obj,
        faculty: String,
    })

    const EducationalManager = mongoose.model('EducationalManager', EducationalManagerSchema)
    
    return EducationalManager
}