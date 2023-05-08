const asyncHandler = require("express-async-handler");
const ProfessorObject = require("../models/professorModel");
const bcrypt = require("bcrypt");

const createProfessor = asyncHandler(async (req, res) => {
    console.log("admin is: ", req.user);
    if (req.user.role !== "admin") {
        res.status(401);
        console.log("you are not admin");
        throw new Error("Unauthorized");
    }
    
    console.log("req is : ", req.body);
    const input = {firstname, surname, userNumber, password, email, mobilePhone, role, faculty, field, order} = req.body;
    if (!input) {
        res.status(400);
        console.log("all fieldes should be written")
        throw new Error("Bad Request");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);
    const Professor = await ProfessorObject.create(input);
    res.status(201).json(Professor);
});

const getProfessors = asyncHandler(async (req, res) => {
    if (req.user.role === "admin" || req.user.role === "manager") {
        const professors = await ProfessorObject.find()
        res.status(200).json(professors)
    } else {
        res.status(401)
        console.log("Unauthorized: You are not permitioned!")
        throw new Error("Unauthorized")
    }
})

const getProfessor = asyncHandler(async (req, res) => {
    if (req.user.role === "admin" || req.user.role === "manager") {
        const professor = await ProfessorObject.findById(req.params.id)
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

module.exports = {createProfessor, getProfessors, getProfessor}