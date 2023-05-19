const supertest = require("supertest");
const { server } = require("../../../server");
const { sequelize } = require("../../config/db.config");

const request = supertest(server);

let token;

describe("Auth API", () => {
  beforeAll(async () => {
    return await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    server.close();
   return await sequelize.close();
  });

  describe("User Registration Endpoint", () => {
    it("should create a new user", async () => {
      const requestBody = {
        username: "test01",
        email: "test01@gmail.com",
        fullname: "test01",
        password: "12345Aa!",
      };

      const response = await request
        .post("/api/v1/auth/sign-up")
        .send(requestBody);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: "User created" });
    });
  });

  describe("User Login and Logout", () => {
    beforeEach(async () => {
      const requestBody = {
        email: "test01@gmail.com",
        password: "12345Aa!",
      };

      const response = await request
        .post("/api/v1/auth/sign-in")
        .send(requestBody);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("User logged in");

      token = response.body.data.token; // Assign the token value
    });

    it("should logout a user", async () => {
      const response = await request
        .post("/api/v1/auth/sign-out")
        .set("Cookie", `token=${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "User logged out" });
    });
  });
});
