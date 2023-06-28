const asyncHandler = require("express-async-handler")
const TermObject = require("../models/termModel")

const createTerm = asyncHandler(async (req, res) => {
    /*** 
     * this function should be implemented with somthing like below!!
     * 
    */

    // console.log("Educational Manager is: ", req.user)
    // if (req.user.role !== "manager") {
    //     res.status(401)
    //     console.log("you are not Educational Manager")
    //     throw new Error("Unauthorized")
    // }
    
    // console.log("req is : ", req.body)
    // let courseInput = {
    //     courseName,
    //     prerequisites,
    //     corequirements,
    //     unit,
    //     classDateTime,
    //     examDateTime,
    //     examLocation,
    //     lecturer,
    //     capacity,
    //     academicSemester
    // } = req.body

    // if (!courseInput) {
    //     res.status(400)
    //     console.log("all fieldes should be written")
    //     throw new Error("Bad Request")
    // }

    // let Course = await CourseObject.create(courseInput)
    // res.status(201).json(Course)
})

const getTerms = asyncHandler(async (req, res) => {
    let terms = await TermObject.find()
    res.status(200).json(terms)
})

const getTerm = asyncHandler(async (req, res) => {
    let term = await TermObject.findById(req.params.id)
    if (!term) {
        res.status(404)
        throw new Error("Not Found")
    }
    res.status(200).json(term)
})

const updateTerm = asyncHandler(async (req, res) => {
    /*** 
     * this function should be implemented with somthing like below!!
     * 
    */

    // if (req.user.role !== "manager") {
    //     res.status(401)
    //     console.log("Unauthorized: you are not manager")
    //     throw new Error("Unauthorized")
    // }

    // let course = await CourseObject.findById(req.params.id)
    // if (!course) {
    //     res.status(404)
    //     console.log("Not Found: Course not found")
    //     throw new Error("Not Found")
    // }
    // let updatedCourse = await CourseObject.findByIdAndUpdate(
    //     req.params.id,
    //     req.body,
    //     {new: true}
    // )
    // res.status(200).json(updatedCourse)
})

const deleteTerm = asyncHandler(async (req, res) => {
    /*** 
     * this function should be implemented with somthing like below!!
     * 
    */
    
    // if (req.user.role !== "manager") {
    //     res.status(401)
    //     console.log("Unauthorized: you are not Educational Manager")
    //     throw new Error("Unauthorized")
    // }
    // let course = await CourseObject.findById(req.params.id)
    // if (!course) {
    //     res.status(404)
    //     console.log("Not Found: Course not found")
    //     throw new Error("Not Found")
    // }
    // await CourseObject.deleteOne(course)
    // res.status(200).json(course)
})

const getPreregistrationCourses = asyncHandler(async (req, res) => {
    let term = await TermObject.findById(req.params.id)
    if (!term) {
        res.status(404)
        console.log("Not Found: Term not found")
        throw new Error("Not Found")
    }
    
    res.status(200).json(term.preregistrationCourses)
})

module.exports = {
    createTerm,
    getTerms,
    getTerm,
    updateTerm,
    deleteTerm,
    getPreregistrationCourses
}