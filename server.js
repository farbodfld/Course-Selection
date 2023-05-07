require("dotenv").config()

const connectToDB = require("./config/db.config");
connectToDB();

const express = require('express');
const app = express();

app.use(express.json())

// admin APIs routes
app.use("/api/admin", require("./routes/professorRoutes"));


const PORT = process.env.port || 8080 

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})