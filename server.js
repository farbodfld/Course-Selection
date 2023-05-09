require("dotenv").config()

const connectToDB = require("./config/db.config");
connectToDB();

const express = require('express');
const app = express();

app.use(express.json())

// admin APIs routes
const professorRoutes = require("./routes/professorRoutes")
const studentRoutes = require("./routes/studentRoutes")
const managerRoutes = require("./routes/managerRoutes")
let courseRoutes = require("./routes/courseRoutes")
app.use("/api/admin", professorRoutes, studentRoutes, managerRoutes)

// Users APIs routes
const userRoutes = require("./routes/userRoutes")
app.use("/api", userRoutes, professorRoutes, studentRoutes, courseRoutes)


const PORT = process.env.port || 8080 

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})