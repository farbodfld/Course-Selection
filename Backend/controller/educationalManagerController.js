const asyncHandler = require('express-async-handler');
const Semester = require('../models/semesterModel');
const CourseRegistration = require('../models/courseRegistrationModel');
const CourseRequest = require('../models/courseRequestModel');
const ApprovedCourse = require('../models/approvedCourseModel');
const ObjectId = require('mongoose').Types.ObjectId;

// VIEW LIST OF ALL SEMESTERS
const getSemesters = asyncHandler(async (req, res) => {
    const semesters = await Semester.find().populate('courses');
    res.status(200).json(semesters);
});

// VIEW INFORMATION OF A SEMESTER BY ID
const getSemesterById = asyncHandler(async (req, res) => {
    const semester = await Semester.findById(req.params.id).populate('courses');
    if (!semester) {
        res.status(404);
        throw new Error('Semester not found');
    }
    res.status(200).json(semester);
});

const createSemester = asyncHandler(async (req, res) => {
    if (req.user.role !== "admin") {
        res.status(400);
        throw new Error("you are not admin");
    }

    let input = { name, courses, users, preregistration_courses, registration_courses } = req.body;
    console.log('req is: ', input)

    if (!name) {
        res.status(400);
        throw new Error('Semester name is required');
    }

    // Create a new instance of the Semester model with the given name and termCourses
    const semester = new Semester(input);

    // Save the new semester to the database
    const savedSemester = await semester.save();

    res.status(201).json(savedSemester);
});

// UPDATE A SEMESTER BY ID
const updateSemester = asyncHandler(async (req, res) => {
    if (req.user.role === "manager" || req.user.role === "admin") {
        const term = await Semester.findById(req.params.id);
        if (!term) {
            res.status(404);
            throw new Error("Term not found");
        }
        const updatedSemester = await Semester.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedSemester);
    } else {
        res.status(400);
        throw new Error("you are not permitioned");
    }
});

// DELETE A SEMESTER BY ID
const deleteSemester = asyncHandler(async (req, res) => {
    if (req.user.role !== "manager" || req.user.role !== "admin") {
        res.status(400);
        throw new Error("you are not manager or admin");
    }

    const term = await Semester.findById(req.params.id);
    if (!term) {
        res.status(404);
        throw new Error("Term not found");
    }

    await Semester.deleteOne(term);
    res.status(200).json(term);
});



// ADD A COURSE TO PREREGISTRATION COURSE LIST FOR A SEMESTER
const addCourseToPreregistration = asyncHandler(async (req, res) => {
    if (req.user.role === "manager") {
        const term = await Semester.findById(req.params.id);
        if (!term) {
            res.status(404);
            throw new Error("Term not found");
        }
        const update = {
            $push: { preregistration_courses: req.body.preregistration_courses }
        };
        const updatedTerm = await Semester.findByIdAndUpdate(
            req.params.id,
            update,
            { new: true }
        );

        res.status(200).json(updatedTerm);
    } else {
        res.status(400);
        throw new Error("you are not permitioned");
    }
});

// VIEW PREREGISTRATION COURSE LIST FOR A SEMESTER
const getPreregistrationCourseList = asyncHandler(async (req, res) => {
    const term = await Semester.findById(req.params.id);
    if (!term) {
        res.status(404);
        throw new Error("Term not found");
    }

    try {
        const preRegCoursesNames = term.preregistration_courses; // Get the preRegCoursesNames array
        res.status(200).json({preRegCoursesNames}); // Return the preRegCoursesNames array in the response
    } catch (err) {
        res.status(500).json({error: err.message}); // Handle any errors
    }
});

// REMOVE A COURSE FROM PREREGISTRATION COURSE LIST FOR A SEMESTER
const removeCourseFromPreregistration = asyncHandler(async (req, res) => {
    if (req.user.role !== "manager") {
        res.status(400);
        throw new Error("you are not manager");
    }

    const term = await Semester.findById(req.params.id);
    if (!term) {
        res.status(404);
        throw new Error("Term not found");
    }

    try {
        const courseToDelete = req.body.course; // Get the course to delete from the request body
        const updatedCourses = term.courses.filter((course) => course !== courseToDelete); // Filter out the specified course
        term.courses = updatedCourses; // Update the preRegCoursesNames field
        await term.save(); // Save the updated term to the database
        res.status(200).json(term); // Return the updated term in the response
    } catch (err) {
        res.status(500).json({error: err.message}); // Handle any errors
    }
});

// ADD A COURSE TO REGISTRATION COURSE LIST FOR A SEMESTER
const addCourseToRegistration = asyncHandler(async (req, res) => {
    const semester = await Semester.findById(req.params.id).populate('preregistration_courses');
    const { courseId } = req.body;
    if (!courseId) {
        res.status(400);
        throw new Error('Course ID is required');
    }
    const course = semester.preregistration_courses.find((c) => c._id.equals(courseId));
    if (!course) {
        res.status(404);
        throw new Error('Course not found in preregistration list');
    }
    if (semester.registration_courses.some((c) => c._id.equals(courseId))) {
        res.status(400);
        throw new Error('Course is already in registration list');
    }
    const courseRegistration = await CourseRegistration.create({ course: courseId, semester: semester._id });
    semester.registration_courses.push(courseRegistration._id);
    await semester.save();
    res.status(200).json(semester);
});

// VIEW REGISTRATION COURSE LIST FOR A SEMESTER
const getRegistrationCourseList = asyncHandler(async (req, res) => {
    const semester = await Semester.findById(req.params.id).populate('registration_courses');
    if (!semester) {
        res.status(404);
        throw new Error('Semester not found');
    }
    const courseRegistrations = await CourseRegistration.find({ semester: semester._id }).populate('course');
    res.status(200).json(courseRegistrations);
});

// REMOVE A COURSE FROM REGISTRATION COURSE LIST FOR A SEMESTER
const removeCourseFromRegistration = asyncHandler(async (req, res) => {
    const semester = await Semester.findById(req.params.id).populate('registration_courses');
    const { courseId } = req.body;
    if (!courseId) {
        res.status(400);
        throw new Error('Course ID is required');
    }
    const courseRegistration = semester.registration_courses.find((c) => c.course.equals(courseId));
    if (!courseRegistration) {
        res.status(404);
        throw new Error('Course not found in registration list');
    }
    await CourseRegistration.findByIdAndDelete(courseRegistration._id);
    semester.registration_courses = semester.registration_courses.filter((c) => !c.course.equals(courseId));
    await semester.save();
    res.status(200).json(semester);
});

// ADD A COURSE REQUEST TO A SEMESTER
const addCourseRequest = asyncHandler(async (req, res) => {
    const semester = await Semester.findById(req.params.id);
    const { courseId, description } = req.body;
    if (!courseId || !description) {
        res.status(400);
        throw new Error('Course ID and description are required');
    }
    const courseRequest = await CourseRequest.create({ course: courseId, description, semester: semester._id });
    semester.course_requests.push(courseRequest._id);
    await semester.save();
    res.status(200).json(semester);
});

// VIEW COURSE REQUESTS FOR A SEMESTER
const getCourseRequests = asyncHandler(async (req, res) => {
    const semester = await Semester.findById(req.params.id).populate({
        path: 'course_requests',
        populate: {
            path: 'course',
        },
    });
    if (!semester) {
        res.status(404);
        throw new Error('Semester not found');
    }
    res.status(200).json(semester.course_requests);
});

// APPROVE A COURSE REQUEST FOR A SEMESTER
const approveCourseRequest = asyncHandler(async (req, res) => {
    const semester = await Semester.findById(req.params.id);
    const { requestId, courseId } = req.body;
    if (!requestId || !courseId) {
        res.status(400);
        throw new Error('Request ID and course ID are required');
    }
    const courseRequest = await CourseRequest.findById(requestId);
    if (!courseRequest || !courseRequest.semester.equals(semester._id)) {
        res.status(404);
        throw new Error('Course request not found for this semester');
    }
    const course = await ApprovedCourse.create({ course: courseId, semester: semester._id });
    semester.courses.push(course._id);
    await semester.save();
    await CourseRequest.findByIdAndDelete(requestId);
    res.status(200).json(semester);
});

// VIEW APPROVED COURSES FOR A SEMESTER
const getApprovedCourses = asyncHandler(async (req, res) => {
    const semester = await Semester.findById(req.params.id).populate('courses');
    if (!semester) {
        res.status(404);
        throw new Error('Semester not found');
    }
    res.status(200).json(semester.courses);
});

// GET PREREGISTRATION LIST FOR A COURSE
const getPreregistrationsForCourse = asyncHandler(async (req, res) => {
    const courseId = req.params.id;
    const semester = await Semester.findOne({ preregistration_courses: { $in: [courseId] } });
    if (!semester) {
        res.status(404);
        throw new Error('Course not found in any semester');
    }
    const preregistrations = await User.find({ _id: { $in: semester.preregisteredStudents } });
    res.status(200).json(preregistrations);
});

// CONFIRM OR REJECT COURSE REGISTRATION OF A STUDENT
const confirmOrRejectCourseRegistration = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
        res.status(400);
        throw new Error('Status is required');
    }
    const courseRegistration = await CourseRegistration.findById(id).populate('course semester');
    if (!courseRegistration) {
        res.status(404);
        throw new Error('Course registration not found');
    }
    if (courseRegistration.status !== 'pending') {
        res.status(400);
        throw new Error('Course registration status cannot be updated');
    }
    const semester = courseRegistration.semester;
    const course = courseRegistration.course;
    const student = courseRegistration.student;
    if (status === 'confirmed') {
        if (course.capacity <= courseRegistration.numOfStudents) {
            res.status(400);
            throw new Error('Course is full');
        }
        courseRegistration.status = 'confirmed';
        courseRegistration.save();
        semester.preregisteredStudents = semester.preregisteredStudents.filter((s) => !s.equals(student));
        await semester.save();
    } else if (status === 'rejected') {
        courseRegistration.status = 'rejected';
        courseRegistration.save();
    } else {
        res.status(400);
        throw new Error('Invalid status');
    }
    res.status(200).json(courseRegistration);
});

module.exports = {
    getSemesters,
    getSemesterById,
    createSemester,
    updateSemester,
    deleteSemester,
    addCourseToPreregistration,
    getPreregistrationCourseList,
    removeCourseFromPreregistration,
    addCourseToRegistration,
    getRegistrationCourseList,
    removeCourseFromRegistration,
    addCourseRequest,
    getCourseRequests,
    approveCourseRequest,
    getApprovedCourses,
    getPreregistrationsForCourse,
    confirmOrRejectCourseRegistration,
};