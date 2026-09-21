const express = require("express");

const {
    registerUser,
    loginUser,
    currentUser
} = require("../controllers/userControllers.js");

const validateToken = require("../middlewares/validateToken.js");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

module.exports = router;