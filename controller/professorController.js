const asyncHandler = require("express-async-handler")
const ProfessorObject = require("../models/professorModel")
const bcrypt = require("bcrypt")

const createProfessor = asyncHandler(async (req, res) => {
    console.log("admin is: ", req.user)
    if (req.user.role !== "admin") {
        res.status(401)
        console.log("you are not admin")
        throw new Error("Unauthorized")
    }
    
    console.log("req is : ", req.body)
    let input = {
        firstname,
        surname,
        userNumber,
        password,
        email,
        mobilePhone,
        role,
        faculty,
        field,
        order
    } = req.body

    if (!input) {
        res.status(400)
        console.log("all fieldes should be written")
        throw new Error("Bad Request")
    }

    let hashedPassword = await bcrypt.hash(password, 10)
    console.log("Hashed Password: ", hashedPassword)
    let Professor = await ProfessorObject.create(input)
    res.status(201).json(Professor)
})

const getProfessors = asyncHandler(async (req, res) => {
    if (req.user.role === "admin" || req.user.role === "manager") {
        let professors = await ProfessorObject.find()
        res.status(200).json(professors)
    } else {
        res.status(401)
        console.log("Unauthorized: You are not permitioned!")
        throw new Error("Unauthorized")
    }
})

const getProfessor = asyncHandler(async (req, res) => {
    if (req.user.role === "admin" || req.user.role === "manager") {
        let professor = await ProfessorObject.findById(req.params.id)
        if (!professor) {
            res.status(404)
            console.log("Not Found: The Professor dosen't exist!")
            throw new Error("Not Found")
        }
        res.status(200).json(professor)
    } else {
        res.status(401)
        console.log("Unauthorized: You are not permitioned!")
        throw new Error("Unauthorized")
    }

})

const updateProfessor = asyncHandler(async (req, res) => {
    if (req.user.role === "admin" || req.user.role === "professor") {
        let professor = await ProfessorObject.findById(req.params.id)
        if (!professor) {
            res.status(404)
            console.log("Not Found: Professor does not found!!")
            throw new Error("Not Found")
        }

        // if (!(req.user.role === "professor" && req.user.id === professor.id)) {
        //     res.status(403)
        //     throw new Error("Professor not abele to do that")
        // }

        if (req.user.role === "professor"){
            if (!(req.user.id === professor.id)){
                res.status(403)
                console.log("Forbidden: Professor is not abale to make changes!")
                throw new Error("Forbidden")
            }
        }

        let updatedProfessor = await ProfessorObject.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        res.status(200).json(updatedProfessor);
    } else {
        res.status(401)
        console.log("Unauthorized: You are not permitioned!")
        throw new Error("Unauthorized")
    }
})

const deleteProfessor = asyncHandler(async (req, res) => {
    if (req.user.role !== "admin") {
        res.status(400)
        console.log("Bad Request: You are not admin!")
        throw new Error("Bad Request")
    }

    let professor = await ProfessorObject.findById(req.params.id)
    if (!professor) {
        res.status(404)
        console.log("Not Found: Professor not found!")
        throw new Error("Not Found")
    }

    await ProfessorObject.deleteOne(professor);
    res.status(200).json(professor);
})

module.exports = {createProfessor, getProfessors, getProfessor, updateProfessor, deleteProfessor}