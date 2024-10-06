const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { SendResponse, StatusCodes } = require("../utils");

const upload_dir = path.join(__dirname, "../uploads");

if (!fs.existsSync(upload_dir)) {
    fs.mkdirSync(upload_dir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, upload_dir);
    },
    filename: (request, file, callback) => {
        const unique_suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const base_name = path.parse(file.originalname).name;
        const extension = path.extname(file.originalname);

        callback(null, `${base_name}-${unique_suffix}${extension}`);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
}).single("file");

module.exports = (req, res, next) => {
    upload(req, res, function (error) {
        if (error instanceof multer.MulterError) {
            if (error.code === "LIMIT_FILE_SIZE") {
                return SendResponse(res, StatusCodes.BAD_REQUEST, null, ["File too large. Maximum size is 5MB."]);
            }

            return SendResponse(res, StatusCodes.BAD_REQUEST, null, [error.message]);
        } else if (error) {
            next(error);
        }

        next();
    });
};
