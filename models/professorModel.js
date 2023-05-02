const userSchema = require('./userModel')

module.exports = mongoose => {

    const ProfessorSchema = new mongoose.Schema({
        ...userSchema.obj,
        faculty: String,
        order: String,
      });

      const Professor = mongoose.model('Professor', ProfessorSchema)
    
    return Professor
}