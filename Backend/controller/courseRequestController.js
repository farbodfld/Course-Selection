const asyncHandler = require('express-async-handler');
const CourseRequest = require('../models/courseRequestModel');
const Semester = require('../models/semesterModel');

const createPreregReq = asyncHandler(async (req, res) => {
    if (req.user.role !== "student") {
        res.status(400);
        throw new Error("you are not student");
    }
    const studentId = req.user.id;
    console.log("req is : ", req.body);
    const termName = req.body.termName;
    const selectedCoursesIds = req.body.selectedCoursesIds;

    console.log("input is : ", {studentId, termName, selectedCoursesIds});
    const PreregReq = await CourseRequest.create({studentId, termName, selectedCoursesIds});
    res.status(201).json(PreregReq);
});


const addCourseToPreregReq = asyncHandler(async (req, res) => {
    console.log('hiiii')
    if (req.user.role !== "student") {
        res.status(400);
        throw new Error("you are not student");
    }
    const input = {selectedCoursesIds, termID, studentNumber} = req.body;

    try {
        const update = {
            $push: {selectedCoursesIds: selectedCoursesIds}
        };
        const preReq = await CourseRequest.findOneAndUpdate(
            req.params.id,
            update,
            {new: true}
        );

        const updateTerm = {
            $push: {preregistrations: studentNumber}
        };
        const term = await Semester.findOneAndUpdate(
            termID,
            updateTerm,
            {new: true}
        );
        console.log("updated term is: ", term)

        if (!preReq) {
            return res.status(404).json({message: "preReq not found"});
        }

        return res.status(200).json(preReq);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
});

const getPreregReqs = asyncHandler(async (req, res) => {
    if (req.user.role === "student" || req.user.role === "manager") {
        const preregReq = await CourseRequest.find();
        res.status(200).json(preregReq);
    } else {
        res.status(400);
        throw new Error("hey");
    }
});

module.exports = {
    createPreregReq,
    addCourseToPreregReq,
    getPreregReqs
}