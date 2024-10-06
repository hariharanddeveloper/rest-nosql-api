const request = require("supertest");
const app = require("../../server");

describe("file download unit test cases", () => {
    it("success - get file", async () => {
        const response = await request(app).get("/api/download/sample.download.txt");

        expect(response.status).toBe(200);

        expect(response.text).toBe("sample download file");
        expect(response.headers["content-type"]).toBe("text/plain; charset=UTF-8");
    });

    it("error - invalid file", async () => {
        const response = await request(app).get("/api/download/untitled.txt");

        expect(response.status).toBe(404);
        expect(response.body.messages).toEqual(["Endpoint not found."]);
    });
});
