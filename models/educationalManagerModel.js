const BaseUser = require('./userModel')
const mongoose = require("mongoose")

const EducationalManagerSchema = new mongoose.Schema(
    {
        faculty: String,
    },
    {
        timestamps: true,
    }
);

module.exports = BaseUser.discriminator("EducationalManager", EducationalManagerSchema)