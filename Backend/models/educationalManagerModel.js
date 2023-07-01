const BaseUser = require('./userModel')
const mongoose = require("mongoose")

const EducationalManagerSchema = new mongoose.Schema(
    {
        faculty: {
            type : String
            // type: mongoose.Schema.Types.ObjectId,
            // ref: 'Faculty',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = BaseUser.discriminator("EducationalManager", EducationalManagerSchema)