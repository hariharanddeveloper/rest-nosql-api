const { SendResponse, StatusCodes } = require("../utils");
const rate_limiters = new Map();

const LIMIT = 100;
const INTERVAL = 10 * 60 * 1000;

module.exports = (req, res, next) => {
    const ip = req.ip;
    const current_time = Date.now();

    if (!rate_limiters.has(ip)) {
        rate_limiters.set(ip, { count: 1, lastRequestTime: current_time });
    } else {
        const rate_limiter = rate_limiters.get(ip);

        if (current_time - rate_limiter.lastRequestTime < INTERVAL) {
            if (rate_limiter.count >= LIMIT) {
                SendResponse(res, StatusCodes.TOO_MANY_REQUESTS, null, ["Too many requests"]);
            }

            rate_limiter.count++;
        } else {
            rate_limiter.count = 1;
            rate_limiter.lastRequestTime = current_time;
        }
    }

    next();
};

setInterval(() => {
    const current_time = Date.now();

    rate_limiters.forEach((value, key) => {
        if (current_time - value.lastRequestTime > INTERVAL) {
            rate_limiters.delete(key);
        }
    });
}, INTERVAL);
