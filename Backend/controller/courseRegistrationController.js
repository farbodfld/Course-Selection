const asyncHandler = require('express-async-handler');
const CourseRegistration = require('../models/courseRegistrationModel');
const Semester = require('../models/semesterModel');

const createRegReq = asyncHandler(async (req, res) => {
    if (req.user.role !== "student") {
        res.status(400);
        throw new Error("you are not student");
    }
    const studentId = req.user.id;
    console.log("req is : ", req.body);
    const termName = req.body.termName;
    const selectedCoursesIds = req.body.selectedCoursesIds;
    const isApproved = false

    console.log("input is : ", {studentId, termName, selectedCoursesIds, isApproved});
    const RegReq = await CourseRegistration.create({studentId, termName, selectedCoursesIds, isApproved});
    res.status(201).json(RegReq);
});


const addCourseToRegReq = asyncHandler(async (req, res) => {
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
        const preReq = await CourseRegistration.findOneAndUpdate(
            req.params.id,
            update,
            {new: true}
        );

        const updateTerm = {
            $push: {registrations: studentNumber}
        };
        const term = await Semester.findOneAndUpdate(
            termID,
            updateTerm,
            {new: true}
        );
        console.log("updated term is: ", term)

        if (!preReq) {
            return res.status(404).json({message: "Req not found"});
        }

        return res.status(200).json(preReq);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
});

const getRegReqs = asyncHandler(async (req, res) => {
    if (req.user.role === "student" || req.user.role === "manager") {
        const RegReq = await CourseRegistration.find();
        res.status(200).json(RegReq);
    } else {
        res.status(400);
        throw new Error("hey");
    }
});

const deleteRegReqs = asyncHandler(async (req, res) => {
    if (req.user.role !== "student" || req.user.role !== "admin") {
        res.status(400);
        throw new Error("you are not student");
    }

    const Regreq = await CourseRegistration.findById(req.params.id);
    if (!Regreq) {
        res.status(404);
        throw new Error("register request not found");
    }

    await CourseRegistration.deleteOne(Regreq);
    res.status(200).json(Regreq);
});

const acceptRegistration = asyncHandler(async (req, res) => {
    if (req.user.role === "mentor" || req.user.role === "assistance") {
        let reg = await CourseRegistration.findById(req.params.id)
        if (!reg) {
            res.status(404)
            console.log("Not Found: registration did not found!!")
            throw new Error("Not Found")
        }
  
        let updatedReg = await CourseRegistration.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        res.status(200).json(updatedReg);
    } else {
        res.status(401)
        console.log("Unauthorized: You are not permitioned!")
        throw new Error("Unauthorized")
    }
  })

module.exports = {
    createRegReq,
    addCourseToRegReq,
    getRegReqs,
    deleteRegReqs,
    acceptRegistration
}