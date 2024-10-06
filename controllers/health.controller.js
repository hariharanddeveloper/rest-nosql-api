const { StatusCodes, SendResponse } = require("../utils");

const getHealth = (req, res) => {
    SendResponse(
        res,
        StatusCodes.OK,
        {
            status: "OK",
            uptime: process.uptime(),
            memoryUsage: process.memoryUsage(),
            timestamp: Date.now(),
        },
        { success: ["Server is healthy."] }
    );
};

module.exports = { getHealth };
