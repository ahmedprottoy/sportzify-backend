const authRepo = require("../../repositories/auth.repo");
const user = require("../../models/user.model");

jest.mock("../../models/user.model");

describe("authRepo", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  describe("getUserByEmail", () => {
    it("should get a user by email", async () => {
      const email = "test@example.com";
      const mockUser = { id: 1, email, username: "testuser" };

      user.findOne.mockResolvedValueOnce(mockUser);

      const result = await authRepo.getUserByEmail(email);

      expect(user.findOne).toHaveBeenCalledWith({ where: { email } });
      expect(result).toEqual(mockUser);
    });
  });

  describe("getUserByUsername", () => {
    it("should get a user by username", async () => {
      const username = "testuser";
      const mockUser = { id: 1, email: "test@example.com", username };

      user.findOne.mockResolvedValueOnce(mockUser);

      const result = await authRepo.getUserByUsername(username);

      expect(user.findOne).toHaveBeenCalledWith({ where: { username } });
      expect(result).toEqual(mockUser);
    });
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const userObj = {
        user_id: "123",
        username: "testuser",
        email: "test@example.com",
        fullname: "Test User",
        password: "password123",
      };
      const mockUser = { id: 1, ...userObj };

      user.create.mockResolvedValueOnce(mockUser);

      const result = await authRepo.createUser(userObj);

      expect(user.create).toHaveBeenCalledWith(userObj);
      expect(result).toEqual(mockUser);
    });
  });
});
