const BaseUser = require('./userModel')
const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
    {
        educationalLevel:
        {
            type: String,
            enum: ["bachelor", "master", "PHD"],
        },
        entryYear: Number,
        incomingSemester: 
        {
            type: String,
            enum: ["Fall", "Winter", "Spring", "Summer"],
        },
        GPA: Number,
        faculty: String,
    },
    {
        timestamps: true,
    }
);

module.exports = BaseUser.discriminator("Student", StudentSchema);