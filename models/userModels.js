const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter the username."],
            trim: true
        },

        email: {
            type: String,
            required: [true, "Email is mandatory."],
            unique: true,
            trim: true,
            lowercase: true
        },

        password: {
            type: String,
            required: [true, "Password is mandatory."]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);