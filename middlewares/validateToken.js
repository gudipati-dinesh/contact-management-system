const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validateToken = asyncHandler(async (req, res, next) => {
    const authHeader =
        req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401);
        throw new Error("Authorization token is missing or invalid.");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        res.status(401);
        throw new Error("Access token is missing.");
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
        console.error("ACCESS_TOKEN_SECRET is missing in .env");

        res.status(500);
        throw new Error("Server authentication configuration is missing.");
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        req.user = decoded.user;

        next();
    } catch (error) {
        res.status(401);
        throw new Error("User is not authorized. Invalid or expired token.");
    }
});

module.exports = validateToken;