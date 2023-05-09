require("dotenv").config()

const connectToDB = require("./config/db.config");
connectToDB();

const express = require('express');
const app = express();

app.use(express.json())

let userRoutes = require("./routes/userRoutes")
let professorRoutes = require("./routes/professorRoutes")
let studentRoutes = require("./routes/studentRoutes")
let managerRoutes = require("./routes/managerRoutes")
let courseRoutes = require("./routes/courseRoutes")

// Users APIs routes
app.use("/api", userRoutes, professorRoutes, studentRoutes, courseRoutes)

// admin APIs routes
app.use("/api/admin", professorRoutes, studentRoutes, managerRoutes)

const PORT = process.env.port || 8080 

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})