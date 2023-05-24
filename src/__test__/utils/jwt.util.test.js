const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const jwtUtil = require("../../utils/jwt.util");

// Load environment variables
dotenv.config();

describe("jwtUtil", () => {
  const username = "testuser";
  let token;

  beforeAll(async () => {
    // Generate an access token for testing
    token = await jwtUtil.generateAccessToken(username);
  });

  it("should generate an access token with the provided username", async () => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    expect(decoded.username).toBe(username);
  });

  it("should verify the provided access token", async () => {
    const decoded = await jwtUtil.verifyAccessToken(token);

    expect(decoded.username).toBe(username);
  });

  it("should get the cookie from the request", async () => {
    const req = {
      cookies: {
        authorization: token,
      },
      headers: {
        authorization: token,
      },
    };

    const cookie = await jwtUtil.getCookie(req);

    expect(cookie).toBe(token);
  });
});
