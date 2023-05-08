const asyncHandler = require("express-async-handler");
const StudentObject = require("../models/studentModel");
const bcrypt = require("bcrypt");

const createStudent = asyncHandler(async (req, res) => {
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
      educationalLevel,
      entryYear,
      incomingSemester,
      GPA,
      faculty
  } = req.body

  if (!input) {
      res.status(400)
      console.log("all fieldes should be written")
      throw new Error("Bad Request")
  }

  let hashedPassword = await bcrypt.hash(password, 10)
  console.log("Hashed Password: ", hashedPassword)

  let student = await StudentObject.create(input)
  res.status(201).json(student)
})

const getStudents = asyncHandler(async (req, res) => {
  if (req.user.role === "admin" || req.user.role === "manager") {
      let students = await StudentObject.find()
      res.status(200).json(students)
  } else {
      res.status(401)
      console.log("Unauthorized: You are not permitioned!")
      throw new Error("Unauthorized")
  }
})

const getStudent = asyncHandler(async (req, res) => {
  if (req.user.role === "admin" || req.user.role === "manager") {
      let student = await StudentObject.findById(req.params.id)
      if (!student) {
          res.status(404)
          console.log("Not Found: The Student dosen't exist!")
          throw new Error("Not Found")
      }
      res.status(200).json(student)
  } else {
      res.status(401)
      console.log("Unauthorized: You are not permitioned!")
      throw new Error("Unauthorized")
  }
})

const updateStudent = asyncHandler(async (req, res) => {
  if (req.user.role === "admin" || req.user.role === "student") {
      let student = await StudentObject.findById(req.params.id)
      if (!student) {
          res.status(404)
          console.log("Not Found: student did not found!!")
          throw new Error("Not Found")
      }

      if (req.user.role === "student"){
          if (!(req.user.id === student.id)){
              res.status(403)
              console.log("Forbidden: student is not abale to make changes!")
              throw new Error("Forbidden")
          }
      }

      let updatedStudent = await StudentObject.findByIdAndUpdate(
          req.params.id,
          req.body,
          {new: true}
      )
      res.status(200).json(updatedStudent);
  } else {
      res.status(401)
      console.log("Unauthorized: You are not permitioned!")
      throw new Error("Unauthorized")
  }
})

const deleteStudent = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
      res.status(400)
      console.log("Bad Request: You are not admin!")
      throw new Error("Bad Request")
  }

  let student = await StudentObject.findById(req.params.id)
  if (!student) {
      res.status(404)
      console.log("Not Found: student not found!")
      throw new Error("Not Found")
  }

  await StudentObject.deleteOne(student);
  res.status(200).json(student);
})

module.exports = {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent
}