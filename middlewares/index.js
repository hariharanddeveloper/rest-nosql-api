const AuthMiddleware = require("./auth.middleware");
const CorsMiddleware = require("./cors.middleware");
const ErrorMiddleware = require("./error.middleware");
const FileUploadMiddleware = require("./file-upload.middleware");
const PreflightMiddleware = require("./preflight.middleware");
const RateLimitMiddleware = require("./rate-limit.middleware");

module.exports = {
    AuthMiddleware,
    CorsMiddleware,
    ErrorMiddleware,
    FileUploadMiddleware,
    PreflightMiddleware,
    RateLimitMiddleware,
};
