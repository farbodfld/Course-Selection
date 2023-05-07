require("dotenv").config()

const connectToDB = require("./config/db.config");
connectToDB();

const express = require('express');
const app = express();

app.use(express.json())

// admin APIs routes
const professorRoutes = require("./routes/professorRoutes")
app.use("/api/admin", professorRoutes);

// Users APIs routes
const adminRoutes = require("./routes/adminRoutes")
app.use("/api", adminRoutes)


const PORT = process.env.port || 8080 

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})