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

const getCourse = asyncHandler(async (req, res) => {
    let course = await CourseObject.findById(req.params.id)
    if (!course) {
        res.status(404)
        throw new Error("Not Found")
    }
    res.status(200).json(course)
})

const updateCourse = asyncHandler(async (req, res) => {
    if (req.user.role !== "manager") {
        res.status(401)
        console.log("Unauthorized: you are not manager")
        throw new Error("Unauthorized")
    }

    let course = await CourseObject.findById(req.params.id)
    if (!course) {
        res.status(404)
        console.log("Not Found: Course not found")
        throw new Error("Not Found")
    }
    let updatedCourse = await CourseObject.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updatedCourse)
})

const deleteCourse = asyncHandler(async (req, res) => {
    if (req.user.role !== "manager") {
        res.status(401)
        console.log("Unauthorized: you are not Educational Manager")
        throw new Error("Unauthorized")
    }
    let course = await CourseObject.findById(req.params.id)
    if (!course) {
        res.status(404)
        console.log("Not Found: Course not found")
        throw new Error("Not Found")
    }
    await CourseObject.deleteOne(course)
    res.status(200).json(course)
})

const getRegistrationsForCourse = async (req, res) => {
    const courseId = req.params.id;
    // Get student id from authentication middleware
    const studentId = req.user.id;
    try {
        const term = await Term.findOne({
            "registration_courses._id": courseId
        });
        if (!term) {
            return res.status(404).json({ message: 'Course not found' });
        }
        const course = term.registration_courses.find(c => c.id === courseId);
        const isRegistered = course.students.includes(studentId);
        const registration = {
            course_name: course.name,
            registered: isRegistered
        };
        res.status(200).json(registration);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse,
    getRegistrationsForCourse
}