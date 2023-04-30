require("dotenv").config()
const express = require('express');
const app = express();

app.use(express.json())

// routes
app.get('/', (req, res) => {
    res.send("Hello API")
})

const PORT = process.env.port || 8080 

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})