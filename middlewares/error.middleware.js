const fs = require("fs");
const path = require("path");
const { SendResponse, StatusCodes } = require("../utils");

const unique_keys = [{ field: "email", message: "Email must be unique." }];

const errorHandler = (err, req, res, next) => {
    if (err.name === "ValidationError") {
        const validationErrors = Object.values(err.errors).map((e) => e.message);

        SendResponse(res, StatusCodes.BAD_REQUEST, null, validationErrors);
    } else if (err.name === "MongoServerError" && err.code === 11000) {
        const error_fields = Object.keys(err.keyValue)[0];
        let error_messages = [];

        unique_keys.forEach((key) => {
            if (key.field.includes(error_fields)) {
                error_messages.push(key.message);
            }
        });

        if (error_messages.length == 0) {
            error_messages.push("Duplicate key error.");
        }

        SendResponse(res, StatusCodes.BAD_REQUEST, null, error_messages);
    } else if (err.name === "CastError") {
        SendResponse(res, StatusCodes.BAD_REQUEST, null, ["Invalid id format."]);
    } else {
        const log_dir = path.join(__dirname, "../logs");
        const log_file = path.join(log_dir, "error.log");

        if (!fs.existsSync(log_dir)) {
            fs.mkdirSync(log_dir, { recursive: true });
        }

        if (!fs.existsSync(log_file)) {
            fs.writeFileSync(log_file, "");
        }

        fs.appendFileSync(log_file, `${new Date().toISOString()} - ${err.message}\n`);

        SendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, null, [err.message]);
    }
};

module.exports = errorHandler;
