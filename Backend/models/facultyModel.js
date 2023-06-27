const mongoose = require('mongoose')

const FacultySchema = new mongoose.Schema(
    {
        name: String,
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Faculty', FacultySchema)