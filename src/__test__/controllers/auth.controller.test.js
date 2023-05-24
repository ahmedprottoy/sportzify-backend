const authService = require("../../services/auth.service");
const {
  signUp,
  signIn,
  signOut,
} = require("../../controllers/auth.controller");

jest.mock("../../services/auth.service");

describe("Auth Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("signUp", () => {
    it("should create a new user", async () => {
      const req = {
        body: {
          username: "testuser",
          email: "test@example.com",
          fullname: "john doe",
          password: "password123",
        },

        headers: { accept: "application/json" },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const newUser = { id: "12345", username: "testuser" };

      authService.createUser.mockResolvedValueOnce(newUser);

      await signUp(req, res);

      expect(authService.createUser).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: "User created" });
    });
  });

    describe("signIn", () => {
      it("should log in a user and return a token", async () => {
        const req = {
          body: { email: "test@example.com", password: "password123" },
          headers: { accept: "application/json" },
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const token = "test_token";

        authService.signIn.mockResolvedValueOnce(token);

        await signIn(req, res);

        expect(authService.signIn).toHaveBeenCalledWith(
          req.body.email,
          req.body.password,
          res
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          data: {
            token,
          },
          message: "User logged in",
        });
      });
    });

    describe("signOut", () => {
      it("should log out a user", async () => {
        const req = {headers: { accept: "application/json" }};
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
          clearCookie: jest.fn(),
        };

        await signOut(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "User logged out" });
        expect(res.clearCookie).toHaveBeenCalledWith("authorization");
      });
    });

});
