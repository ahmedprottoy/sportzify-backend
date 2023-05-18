const userRepo = require("../../repositories/user.repo");


describe("User Repository", () => {
  describe("getUserIdByUsername", () => {
    it("should return the user ID for a valid username", async () => {
      const username = "testuser";
      const userId = 123;

      userRepo.getUserIdByUsername = jest.fn().mockResolvedValueOnce(userId);

      const result = await userRepo.getUserIdByUsername(username);

      expect(userRepo.getUserIdByUsername).toHaveBeenCalledWith(username);
      expect(result).toBe(userId);
    });

    it("should return null for an invalid username", async () => {
      const username = "nonexistentuser";

      userRepo.getUserIdByUsername = jest.fn().mockResolvedValueOnce(null);

      const result = await userRepo.getUserIdByUsername(username);

      expect(userRepo.getUserIdByUsername).toHaveBeenCalledWith(username);
      expect(result).toBeNull();
    });
  });

  describe("getUserById", () => {
    it("should return a user object for a valid user ID", async () => {
      const userId = 123;
      const user = { id: userId, username: "testuser" };

      userRepo.getUserById = jest.fn().mockResolvedValueOnce(user);

      const result = await userRepo.getUserById(userId);

      expect(userRepo.getUserById).toHaveBeenCalledWith(userId);
      expect(result).toBe(user);
    });

    it("should return null for an invalid user ID", async () => {
      const userId = 999;

      userRepo.getUserById = jest.fn().mockResolvedValueOnce(null);

      const result = await userRepo.getUserById(userId);

      expect(userRepo.getUserById).toHaveBeenCalledWith(userId);
      expect(result).toBeNull();
    });
  });

  describe("updateUser", () => {
    it("should update a user and return the number of updated rows", async () => {
      const userId = 123;
      const updateBody = { username: "newusername" };
      const updatedRows = 1;

      userRepo.updateUser = jest.fn().mockResolvedValueOnce(updatedRows);

      const result = await userRepo.updateUser(userId, updateBody);

      expect(userRepo.updateUser).toHaveBeenCalledWith(userId, updateBody);
      expect(result).toBe(updatedRows);
    });
  });

  describe("allBlogs", () => {
    it("should return an array of blog objects for a valid user ID", async () => {
      const userId = 123;
      const blogs = [
        { id: 1, title: "Blog 1" },
        { id: 2, title: "Blog 2" },
      ];

      userRepo.allBlogs = jest.fn().mockResolvedValueOnce(blogs);

      const result = await userRepo.allBlogs(userId);

      expect(userRepo.allBlogs).toHaveBeenCalledWith(userId);
      expect(result).toBe(blogs);
    });
  });

  describe("deleteUser", () => {
    it("should delete a user and return the number of deleted rows", async () => {
      const userId = 123;
      const deletedRows = 1;

      userRepo.deleteUser = jest.fn().mockResolvedValueOnce(deletedRows);

      const result = await userRepo.deleteUser(userId);

      expect(userRepo.deleteUser).toHaveBeenCalledWith(userId);
      expect(result).toBe(deletedRows);
    });
  });
});
