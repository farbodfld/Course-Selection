require("dotenv").config()
const cors = require('cors');

const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const connectToDB = require("./config/db.config")
connectToDB()

const express = require('express')
const app = express()

app.use(cors({ origin: 'http://localhost:3000' }));

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

app.post('/login', (req, res) => {
  // Extract the username and password from the request body
  const { username, password } = req.body;

  // Perform authentication logic here
  // ...

  // Send a response back to the client
  res.json({ success: true, message: 'Authentication successful' });
});

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Course Selection Express API with Swagger",
        version: "1.0.0",
        description:
          "This is a simple Course Selection API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Farbod Fooladi",
          url: "https://github.com/farbodfld",
          email: "farbodfooladi@gmail.com",
        },
      },
      servers: [
        {
          url: "http://localhost:9090/",
        },
      ],
    },
    apis: ["./routes/*.js"],
}
  
const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
)

const PORT = process.env.port || 8080 

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})