const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels.js");

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory.");
    }

    const normalizedEmail = email.trim().toLowerCase();

    const userAvailable = await User.findOne({
        email: normalizedEmail
    });

    if (userAvailable) {
        res.status(400);
        throw new Error("Email is already registered.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username: username.trim(),
        email: normalizedEmail,
        password: hashedPassword
    });

    res.status(201).json({
        message: "User registered successfully.",
        _id: user.id,
        username: user.username,
        email: user.email
    });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please enter all fields.");
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
        email: normalizedEmail
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401);
        throw new Error("Email or password is invalid.");
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
        res.status(500);
        throw new Error("Server authentication configuration is missing.");
    }

    const accessToken = jwt.sign(
        {
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "20m"
        }
    );

    res.status(200).json({
        message: "Login successful.",
        accessToken
    });
});

const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Current user details.",
        user: req.user
    });
});

module.exports = {
    registerUser,
    loginUser,
    currentUser
};