const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        if (!process.env.CONNECTION_STRING) {
            throw new Error("CONNECTION_STRING is missing in .env");
        }

        const connection = await mongoose.connect(
            process.env.CONNECTION_STRING
        );

        console.log(
            "MongoDB connected successfully:",
            connection.connection.host,
            connection.connection.name
        );
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;