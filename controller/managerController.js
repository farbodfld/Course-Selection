const asyncHandler = require("express-async-handler")
const ManagerObject = require("../models/educationalManagerModel")
const bcrypt = require("bcrypt")

const createManager = asyncHandler(async (req, res) => {
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
        faculty
    } = req.body

    if (!input) {
        res.status(400)
        console.log("all fieldes should be written!")
        throw new Error("Bad Request")
    }

    let hashedPassword = await bcrypt.hash(password, 10)
    console.log("Hashed Password: ", hashedPassword)
    let Manager = await ManagerObject.create(input)
    res.status(201).json(Manager)
})

module.exports = {
    createManager
}