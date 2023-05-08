require("dotenv").config()

const connectToDB = require("./config/db.config");
connectToDB();

const express = require('express');
const app = express();

app.use(express.json())

// admin APIs routes
const professorRoutes = require("./routes/professorRoutes")
const studentRoutes = require("./routes/studentRoutes")
app.use("/api/admin", professorRoutes, studentRoutes)

// Users APIs routes
const userRoutes = require("./routes/userRoutes")
app.use("/api", userRoutes, professorRoutes)


const PORT = process.env.port || 8080 

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})