const supertest = require("supertest");
const { server } = require("../../../server");
const { sequelize } = require("../../config/db.config");

const request = supertest(server);
let token;
let cookie;

describe("User API", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });

    const signUpRequest = {
      username: "testUser09",
      email: "testUser09@gmail.com",
      fullname: "testUser",
      password: "testUser09.",
    };

    await request.post("/api/v1/auth/sign-up").send(signUpRequest);

    const signInRequest = {
      email: "testUser09@gmail.com",
      password: "testUser09.",
    };

    const signInResponse = await request
      .post("/api/v1/auth/sign-in")
      .send(signInRequest);

    cookie = signInResponse.headers["set-cookie"];
  });

  afterAll(async () => {
    server.close();
    return await sequelize.close();
  });

  it("should fetch a user by username", async () => {
    const username = "testUser09";

    const response = await request.get(`/api/v1/users/${username}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("User fetched successfully");

    const userData = response.body.data;

    expect(userData.id).toBeDefined();
    expect(userData.username).toEqual(username);
    expect(userData.email).toEqual("testuser09@gmail.com");
    expect(userData.fullname).toEqual("testUser");
    expect(userData.imageUrl).toBeNull();
    expect(userData.createdAt).toBeDefined();
    expect(userData.updatedAt).toBeDefined();
  });

  it("should update a user's profile", async () => {
    const username = "testUser09";
    const requestBody = {
      email: "testuser099@gmail.com",
      password: "testUser09.",
    };

    const response = await request
      .put(`/api/v1/users/${username}`)
      .send(requestBody)
      .set("Cookie", cookie);

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("User updated successfully");

    const userData = response.body.data;

    expect(userData.id).toBeDefined();
    expect(userData.username).toEqual(username);
    expect(userData.email).toEqual("testuser099@gmail.com");
    expect(userData.fullname).toEqual("testUser");
    expect(userData.imageUrl).toBeNull();
    expect(userData.createdAt).toBeDefined();
    expect(userData.updatedAt).toBeDefined();
  });

  it("should update a user's password", async () => {
    const username = "testUser09";

    const requestBody = {
      oldPassword: "testUser09.",
      newPassword: "testUser09..",
    };

    const response = await request
      .put(`/api/v1/users/password/${username}`)
      .send(requestBody)
      .set("Cookie", cookie);

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("Password updated successfully");
  });

  it("get a user's blog posts", async () => {
    const username = "testUser09";

    const response = await request.get(`/api/v1/users/blogs/${username}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("Blogs fetched successfully");

    const posts = response.body.data;

    expect(posts.length).toBe(0);
  });

  it("should update a user's profile picture", async () => {
    const username = "testUser09";

    const response = await request
      .post(`/api/v1/users/image/${username}`)
      .attach("image", "src/__test__/integration_testing/test_file/test.png")
      .set("Cookie", cookie);

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("Image updated successfully");
  });

  it("should delete a user's profile picture", async () => {
    const username = "testUser09";

    const response = await request
      .delete(`/api/v1/users/image/${username}`)
      .set("Cookie", cookie);

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("Image deleted successfully");
  });

  
});
