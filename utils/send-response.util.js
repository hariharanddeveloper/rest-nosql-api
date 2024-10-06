module.exports = (res, status_code, data, messages) => {
    const response_object = { status: status_code < 400 ? "success" : "fail", messages: messages };

    if (data) {
        response_object["data"] = data;
    }

    if (!res.headersSent) {
        res.status(status_code).json(response_object);
    }
};
