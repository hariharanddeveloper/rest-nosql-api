const request = require("supertest");
const app = require("../../server");
const { Mongoose } = require("../../configs");

describe("user unit test cases", () => {
    let user_id;

    beforeAll(async () => {
        await Mongoose();
    });

    test("error - create without data", async () => {
        const response = await request(app).post("/api/users").send({});

        expect(response.status).toBe(400);
        expect(response.body.messages).toEqual(["Name is required.", "Email is required.", "Password is required."]);
    });

    test("error - create without name", async () => {
        const response = await request(app).post("/api/users").send({ email: "test@user.com", password: "password" });

        expect(response.status).toBe(400);
        expect(response.body.messages).toEqual(["Name is required."]);
    });

    test("error - create without name and email", async () => {
        const response = await request(app).post("/api/users").send({ password: "password" });

        expect(response.status).toBe(400);
        expect(response.body.messages).toEqual(["Name is required.", "Email is required."]);
    });

    test("error - create without email", async () => {
        const response = await request(app).post("/api/users").send({ name: "test user", password: "password" });

        expect(response.status).toBe(400);
        expect(response.body.messages).toEqual(["Email is required."]);
    });

    test("error - create without email and password", async () => {
        const response = await request(app).post("/api/users").send({ name: "test user" });

        expect(response.status).toBe(400);
        expect(response.body.messages).toEqual(["Email is required.", "Password is required."]);
    });

    test("error - create without password", async () => {
        const response = await request(app).post("/api/users").send({ name: "test user", email: "test@user.com" });

        expect(response.status).toBe(400);
        expect(response.body.messages).toEqual(["Password is required."]);
    });

    test("error - create without password and name", async () => {
        const response = await request(app).post("/api/users").send({ email: "test@user.com" });

        expect(response.status).toBe(400);
        expect(response.body.messages).toEqual(["Name is required.", "Password is required."]);
    });

    test("error - create with invalid email", async () => {
        const response = await request(app)
            .post("/api/users")
            .send({ name: "test user", email: "test@user", password: "password" });

        expect(response.status).toBe(400);
        expect(response.body.messages).toEqual(["Email must be a valid email address."]);
    });

    test("error - create with invalid password length", async () => {
        const response = await request(app)
            .post("/api/users")
            .send({ name: "test user", email: "test@user.com", password: "pass" });

        expect(response.status).toBe(400);
        expect(response.body.messages).toEqual(["Password must be at least 6 characters long."]);
    });

    test("success - create", async () => {
        const response = await request(app)
            .post("/api/users")
            .send({ name: "test user", email: "test@user.com", password: "password" });

        expect(response.status).toBe(201);
        expect(response.body.messages).toEqual(["User created successfully."]);

        expect(response.body.data).toHaveProperty("_id");
        user_id = response.body.data._id;
    });

    test("error - create with same email", async () => {
        const response = await request(app)
            .post("/api/users")
            .send({ name: "test user", email: "test@user.com", password: "password" });

        expect(response.status).toBe(400);
        expect(response.body.messages).toEqual(["Email must be unique."]);
    });

    test("success - get users", async () => {
        const response = await request(app).get("/api/users");

        expect(response.status).toBe(200);
        expect(response.body.messages).toEqual(["Users data received successfully."]);

        expect(response.body.data.length).toBeGreaterThan(0);
    });

    test("success - get user", async () => {
        const response = await request(app).get(`/api/users/${user_id}`);

        expect(response.status).toBe(200);
        expect(response.body.messages).toEqual(["User data received successfully."]);

        expect(response.body.data).toHaveProperty("_id", user_id);
    });

    test("success - update", async () => {
        const response = await request(app).put(`/api/users/${user_id}`).send({ name: "test user update" });

        expect(response.status).toBe(200);
        expect(response.body.messages).toEqual(["User updated successfully."]);

        expect(response.body.data).toHaveProperty("name", "test user update");
    });

    test("success - delete", async () => {
        const response = await request(app).delete(`/api/users/${user_id}`);

        expect(response.status).toBe(200);
        expect(response.body.messages).toEqual(["User deleted successfully."]);
    });
});
