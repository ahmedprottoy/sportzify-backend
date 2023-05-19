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

  it("should create a blog with an image", async () => {
    
    const requestBody = {
      title: "new blog with image",
      content: "some meaningful content for blog",
    };

    const response = await request
      .post("/api/v1/blogs/")
      .set("Cookie", cookie)
      .field("title", requestBody.title)
      .field("content", requestBody.content)
      .attach("image", "src/__test__/integration_testing/test_file/test.png");

    expect(response.status).toBe(201);
    expect(response.body.message).toEqual("Blog created successfully");

    const blogData = response.body.data;

    expect(blogData.id).toBeDefined();
    expect(blogData.title).toEqual(requestBody.title);
    expect(blogData.content).toEqual(requestBody.content);
    expect(blogData.author).toEqual("testUser09");
    expect(blogData.postedAt).toBeDefined();
    expect(blogData.imageUrl).toContain("http://res.cloudinary.com");
  });

  it("should get all blogs", async () => {
    const response = await request.get("/api/v1/blogs/");

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("Blogs fetched successfully");

    const blogsData = response.body.data;
    console.log(blogsData)

    expect(blogsData.length).toBeGreaterThan(0);
  });

  it("should get a blog by id", async () => {
    const response = await request.get("/api/v1/blogs/1").set("Cookie", cookie);

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("Blog fetched successfully");

    const blogData = response.body.data;

    expect(blogData.id).toBeDefined();
    expect(blogData.title).toEqual("new blog with image");
    expect(blogData.content).toEqual("some meaningful content for blog");
    expect(blogData.postedAt).toBeDefined();
    expect(blogData.imageUrl).toContain("http://res.cloudinary.com");
  });

  it("should update a blog", async () => {
    const requestBody = {
      title: "updated blog",
      content: "updated blog content",
    };

    const response = await request
      .put("/api/v1/blogs/1")
      .set("Cookie", cookie)
      .send(requestBody);

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("Blog updated successfully");

    const blogData = response.body.data;

    expect(blogData.id).toBeDefined();
    expect(blogData.title).toEqual(requestBody.title);
    expect(blogData.content).toEqual(requestBody.content);
    expect(blogData.postedAt).toBeDefined();
    expect(blogData.imageUrl).toContain("http://res.cloudinary.com");
  });

  it("should delete a blog", async () => {
    const response = await request
      .delete("/api/v1/blogs/1")
      .set("Cookie", cookie);

    expect(response.status).toBe(204);
   
  });

});