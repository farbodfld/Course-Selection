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

const getManagers = asyncHandler(async (req, res) => {
    if (req.user.role === "admin" || req.user.role === "manager") {
        let Managers = await ManagerObject.find()
        res.status(200).json(Managers)
    } else {
        res.status(401)
        console.log("Unauthorized: You are not permitioned!")
        throw new Error("Unauthorized")
    }
})

const getManager = asyncHandler(async (req, res) => {
    if (req.user.role === "admin" || req.user.role === "manager") {
        let manager = await ManagerObject.findById(req.params.id)
        if (!manager) {
            res.status(404)
            console.log("Not Found: The manager dosen't exist!")
            throw new Error("Not Found")
        }
        res.status(200).json(manager)
    } else {
        res.status(401)
        console.log("Unauthorized: You are not permitioned!")
        throw new Error("Unauthorized")
    }
})

const updateManager = asyncHandler(async (req, res) => {
    if (req.user.role === "admin" || req.user.role === "professor") {
        let manager = await ManagerObject.findById(req.params.id)
        if (!manager) {
            res.status(404)
            console.log("Not Found: manager did not find!!")
            throw new Error("Not Found")
        }

        if (req.user.role === "manager"){
            if (!(req.user.id === professor.id)){
                res.status(403)
                console.log("Forbidden: manager is not abale to make changes!")
                throw new Error("Forbidden")
            }
        }

        let updatedManager = await ManagerObject.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        res.status(200).json(updatedManager)
    } else {
        res.status(401)
        console.log("Unauthorized: You are not permitioned!")
        throw new Error("Unauthorized")
    }
})

module.exports = {
    createManager,
    getManagers,
    getManager,
    updateManager
}