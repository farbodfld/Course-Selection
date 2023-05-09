const asyncHandler = require("express-async-handler")
const CourseObject = require("../models/semesterCourseModel")

const createCourse = asyncHandler(async (req, res) => {
    console.log("Educational Manager is: ", req.user)
    if (req.user.role !== "manager") {
        res.status(401)
        console.log("you are not Educational Manager")
        throw new Error("Unauthorized")
    }
    
    console.log("req is : ", req.body)
    let courseInput = {
        courseName,
        prerequisites,
        corequirements,
        unit,
        classDateTime,
        examDateTime,
        examLocation,
        lecturer,
        capacity,
        academicSemester
    } = req.body

    if (!courseInput) {
        res.status(400)
        console.log("all fieldes should be written")
        throw new Error("Bad Request")
    }

    let Course = await CourseObject.create(courseInput)
    res.status(201).json(Course)
})

const getCourses = asyncHandler(async (req, res) => {
    let courses = await CourseObject.find()
    res.status(200).json(courses)
})

module.exports = {
    createCourse,
    getCourses
}