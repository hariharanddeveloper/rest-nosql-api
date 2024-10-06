const request = require("supertest");
const app = require("../../server");

describe("file upload unit test cases", () => {
    it("success - upload file", async () => {
        const sample_file_buffer = Buffer.alloc(1 * 1024 * 1024);
        const response = await request(app).post("/api/upload").attach("file", sample_file_buffer, "sample.upload.txt");

        expect(response.status).toBe(200);
        expect(response.body.messages).toEqual(["File uploaded successfully."]);
    });

    it("error - upload large file", async () => {
        const large_file_buffer = Buffer.alloc(6 * 1024 * 1024);
        const response = await request(app).post("/api/upload").attach("file", large_file_buffer, "large.upload.txt");

        expect(response.status).toBe(400);
        expect(response.body.messages).toEqual(["File too large. Maximum size is 5MB."]);
    });
});
