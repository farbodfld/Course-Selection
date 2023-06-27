const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema(
    {
        semesterName: {
            type: String,
            required: true,
        },
        enrolledUsers: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "BaseUser",
                    required: true,
                },
                userType: {
                    type: String,
                    enum: ["student", "professor"],
                    required: true,
                },
                userNumber: {
                    type: Number,
                    required: true,
                },
            },
        ],
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SemesterCourse",
            },
        ],
        faculty: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Semester", semesterSchema);