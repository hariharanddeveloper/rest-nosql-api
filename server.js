const express = require("express");
const path = require("path");
const {
    AuthMiddleware,
    CorsMiddleware,
    ErrorMiddleware,
    FileUploadMiddleware,
    PreflightMiddleware,
    RateLimitMiddleware,
} = require("./middlewares");
const { HealthRoutes, UserRoutes } = require("./routes");
const { SendResponse, StatusCodes } = require("./utils");
const { Mongoose } = require("./configs");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10kb", extended: true }));

app.use(PreflightMiddleware);
app.use(CorsMiddleware);
app.use(RateLimitMiddleware);
app.use(AuthMiddleware);

app.use("/api/health", HealthRoutes);

app.use("/api/download", express.static(path.join(__dirname, "downloads")));

app.post("/api/upload", FileUploadMiddleware, (req, res) => {
    if (!req.file) {
        return SendResponse(res, StatusCodes.BAD_REQUEST, null, ["No file uploaded."]);
    }

    SendResponse(res, StatusCodes.OK, null, ["File uploaded successfully."]);
});

app.use("/api/users", UserRoutes);

app.use("/api", (req, res, next) => {
    SendResponse(res, StatusCodes.NOT_FOUND, null, ["Endpoint not found."]);
});

app.use(ErrorMiddleware);

if (process.env.NODE_ENV !== "test") {
    Mongoose();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}/api/`);
    });
}

module.exports = app;
