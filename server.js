const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/dbConnection.js");
const errorHandler = require("./middlewares/erroHandler.js");

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/contacts", require("./routers/contactRouters.js"));

app.use("/api/users", require("./routers/userRouters.js"));

app.use(errorHandler);

const port = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
};

startServer();