const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validation = asyncHandler(async (req, res, next) => {
    let token
    let authHeader = req.headers.Authorization || req.headers.authorization

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.TOKEN_SECERT, (err, decoded) => {
            if (err) {
                res.status(401)
                console.log("Unauthorized: User is not authorized!")
                throw new Error("Unauthorized");
            }
            req.user = decoded.user
            next()
        })

        if (!token) {
            res.status(401)
            console.log("Unauthorized: User is not authorized or token is missing!!")
            throw new Error("Unauthorized")
        }
    }
})

module.exports = validation  