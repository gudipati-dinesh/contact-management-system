const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        name: {
            type: String,
            required: [true, "Please enter the name."],
            trim: true
        },

        email: {
            type: String,
            required: [true, "Please enter the email."],
            trim: true
        },

        phone: {
            type: String,
            required: [true, "Please enter the phone number."],
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Contacts", contactSchema);