const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const creatAdmin = asyncHandler(async (req, res) => {
    const {
        firstname,
        surname,
        userNumber,
        password,
        email,
        mobilePhone,
        role
    } = req.body

    console.log(req.body)

    if (firstname && surname && userNumber && password && email && mobilePhone && role){
        // check if admin exist or not!
        let userExist = await User.findOne({role})
        if (userExist) {
            res.status(400)
            console.log("User already exist: ", userExist)
            throw new Error("Bad Request")
        }

        // create hash password
        let hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password: ", hashedPassword);
        const user = await User.create({
            firstname,
            surname,
            userNumber,
            password : hashedPassword,
            email,
            mobilePhone,
            role
        });

        // send the request
        console.log(`Admin created ${user}`);
        if (user) {
            res.status(201).json({_id: user.id, email: user.email});
        } else {
            res.status(400);
            throw new Error("User data is not valid");
        }
        res.json({message: "Register the user"});

    } else {
        res.status(400)
        console.log("Bad Request: All fields are mandatory!")
        throw new Error("Bad Request")
    }
})

const login = asyncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body;

    // check the fields
    if (!email || !password) {
        res.status(400);
        console.log("Bad Request: All fields are mandatory!")
        throw new Error("Bad Request");
    }

    const user = await User.findOne({email});
    console.log(user);

    //compare password with hashedpassword
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    role: user.role,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.TOKEN_SECERT,
            {expiresIn: "10m"}
        );
        res.status(200).json({accessToken});
    } else {
        res.status(401);
        console.log("Unauthorized: email or password is not valid!")
        throw new Error("Unauthorized");
    }
})

module.exports = {creatAdmin, login}