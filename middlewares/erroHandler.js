const { constants } = require("../constants.js");

const errorHandler = (err, req, res, next) => {
    const statusCode =
        res.statusCode && res.statusCode !== 200
            ? res.statusCode
            : constants.SERVER_ERROR;

    let title = "Server Error!";

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            title = "Validation Failed";
            break;

        case constants.NOT_FOUND:
            title = "Not Found!";
            break;

        case constants.FORBIDDEN_ERROR:
            title = "Forbidden";
            break;

        case constants.UNAUTHORIZED:
            title = "Unauthorized User!";
            break;

        case constants.SERVER_ERROR:
            title = "Server Error!";
            break;

        default:
            title = "Error";
    }

    const response = {
        title,
        message: err.message || "Something went wrong."
    };

    if (process.env.NODE_ENV !== "production") {
        response.stackTrace = err.stack;
    }

    res.status(statusCode).json(response);
};

module.exports = errorHandler;