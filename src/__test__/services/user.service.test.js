const userService = require("../../services/user.service");
const userRepo = require("../../repositories/user.repo");
const authUtil = require("../../utils/auth.util");
const AppError = require("../../utils/AppError");
const StatusCode = require("../../utils/Objects/StatusCode");
const userDto = require("../../dtos/user.dto");
const blogDto = require("../../dtos/blog.dto");

jest.mock("../../repositories/user.repo");
jest.mock("../../utils/AppError");
jest.mock("../../dtos/user.dto");

describe("userService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("user", () => {
    it("should retrieve a user by username", async () => {
      const username = "testUser";
      const userId = 123;
      const user = { id: userId, name: "Test User" };
      const expectedUserDto = { id: userId, name: "Test User" };

      userRepo.getUserIdByUsername.mockResolvedValue(userId);
      userRepo.getUserById.mockResolvedValue(user);
      userDto.mockImplementation(jest.fn(() => expectedUserDto));

      const result = await userService.user(username);

      expect(userRepo.getUserIdByUsername).toHaveBeenCalledWith(username);
      expect(userRepo.getUserById).toHaveBeenCalledWith(userId);
      expect(userDto).toHaveBeenCalledWith(user);
      expect(result).toEqual(expectedUserDto);
    });

    it("should throw AppError if user is not found", async () => {
      const username = "nonExistentUser";
      const userId = null;
      const expectedError = new AppError(
        StatusCode.NOT_FOUND,
        "User not found"
      );

      userRepo.getUserIdByUsername.mockResolvedValue(userId);

      try {
        await userService.user(username);
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.statusCode).toBe(expectedError.statusCode);
        expect(error.message).toBe(expectedError.message);
      }

      expect(userRepo.getUserIdByUsername).toHaveBeenCalledWith(username);
      expect(userRepo.getUserById).not.toHaveBeenCalled();
      expect(userDto).not.toHaveBeenCalled();
    });
  });

  describe("allBlogs", () => {
    it("should retrieve all blogs of a user", async () => {
      const username = "testuser";
      const userId = "12345";
      const user = { id: userId, username: "testuser" };
      const blogs = [
        {
          id: "blog1",
          title: "Blog 1",
          content: "Content 1",
          username: "john_doe",
        },
        {
          id: "blog2",
          title: "Blog 2",
          content: "Content 2",
          username: "jane_smith",
        },
      ];

      userRepo.getUserIdByUsername.mockResolvedValueOnce(userId);
      userRepo.getUserById.mockResolvedValueOnce(user);
      userRepo.allBlogs.mockResolvedValueOnce(blogs);

      const result = await userService.allBlogs(username);

      expect(userRepo.getUserIdByUsername).toHaveBeenCalledWith(username);
      expect(userRepo.allBlogs).toHaveBeenCalledWith(userId);
      expect(result).toEqual(blogs.map((blog) => new blogDto(blog)));
    });

    it("should throw AppError if user is not found", async () => {
      const username = "nonExistentUser";
      const userId = null;
      const expectedError = new AppError(
        StatusCode.NOT_FOUND,
        "User not found"
      );

      userRepo.getUserIdByUsername.mockResolvedValue(userId);

      try {
        await userService.user(username);
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.statusCode).toBe(expectedError.statusCode);
        expect(error.message).toBe(expectedError.message);
      }

      expect(userRepo.getUserIdByUsername).toHaveBeenCalledWith(username);
    });
  });

  describe("updateUser", () => {
    const username = "testuser";
    const updateBody = { fullname: "John Doe" };
    const password = "testpassword";

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("should update user and return updated user DTO", async () => {
      const userId = "123";
      const user = {
        id: userId,
        username,
        password: "hashedpassword",
        fullname: "John something",
      };
      const updatedUser = { ...user, ...updateBody };
      userRepo.getUserIdByUsername.mockResolvedValue(userId);
      userRepo.getUserById.mockResolvedValue(user);
      authUtil.comparePassword = jest.fn().mockResolvedValueOnce(true);
      userRepo.updateUser.mockResolvedValue(updatedUser);

      const result = await userService.updateUser(
        username,
        updateBody,
        password
      );

      expect(userRepo.getUserIdByUsername).toHaveBeenCalledWith(username);
      expect(userRepo.getUserById).toHaveBeenCalledWith(userId);
      expect(userRepo.updateUser).toHaveBeenCalledWith(userId, updateBody);
      expect(userRepo.getUserById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(new userDto(updatedUser));
    });

    it("should throw an AppError with NOT_FOUND status if user is not found", async () => {
      const username = "nonExistentUsero";
      const expectedError = new AppError(
        StatusCode.NOT_FOUND,
        "User not found"
      );

      userRepo.getUserIdByUsername.mockResolvedValue(null);

      try {
        await userService.updateUser(username, updateBody, password);
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.statusCode).toBe(expectedError.statusCode);
        expect(error.message).toBe(expectedError.message);
      }

      expect(userRepo.getUserIdByUsername).toHaveBeenCalledWith(username);
      expect(userRepo.getUserById).not.toHaveBeenCalled();
      expect(authUtil.comparePassword).not.toHaveBeenCalled();

      expect(userRepo.updateUser).not.toHaveBeenCalled();
    });

    it("should throw an error if password is incorrect", async () => {
      const userId = "123";
      const user = {
        id: userId,
        username,
        password: "hashedpassword",
        firstName: "Jane",
        lastName: "Doe",
      };
      const expectedError = new AppError(
        StatusCode.UNAUTHORIZED,
        "Password is incorrect"
      );
      const updateBody = { username: "John something" };
      const password = "wrongpassword";

      userRepo.getUserIdByUsername.mockResolvedValue(userId);
      userRepo.getUserById.mockResolvedValue(user);
      authUtil.comparePassword = jest.fn().mockResolvedValueOnce(false);

      try {
        await userService.updateUser(username, updateBody, password);
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.statusCode).toBe(expectedError.statusCode);
        expect(error.message).toBe(expectedError.message);
      }
      expect(userRepo.getUserIdByUsername).toHaveBeenCalledWith(username);
      expect(userRepo.getUserById).toHaveBeenCalledWith(userId);
      expect(authUtil.comparePassword).toHaveBeenCalledWith(
        "wrongpassword",
        user.password
      );
      expect(userRepo.updateUser).not.toHaveBeenCalled();
    });
  });

  describe("passwordUpdate", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should update a user's password", async () => {
      const username = "testuser";
      const oldPassword = "old_password";
      const newPassword = "new_password";
      const userId = "12345";
      const user = {
        id: userId,
        username: "testuser",
        password: "hashed_old_password",
      };
      const hashedNewPassword = "hashed_new_password";
      const updatedUser = {
        id: userId,
        username: "testuser",
        password: hashedNewPassword,
      };

      userRepo.getUserIdByUsername.mockResolvedValueOnce(userId);
      userRepo.getUserById.mockResolvedValueOnce(user);
      authUtil.comparePassword = jest.fn().mockResolvedValueOnce(true);
      authUtil.hashPassword = jest
        .fn()
        .mockResolvedValueOnce(hashedNewPassword);
      userRepo.updateUser.mockResolvedValueOnce();
      userRepo.getUserById.mockResolvedValueOnce(updatedUser);

      const result = await userService.passwordUpdate(
        username,
        oldPassword,
        newPassword
      );

      expect(userRepo.getUserIdByUsername).toHaveBeenCalledWith(username);
      expect(userRepo.getUserById).toHaveBeenCalledWith(userId);
      expect(authUtil.comparePassword).toHaveBeenCalledWith(
        oldPassword,
        user.password
      );
      expect(authUtil.hashPassword).toHaveBeenCalledWith(newPassword);
      expect(userRepo.updateUser).toHaveBeenCalledWith(userId, {
        password: hashedNewPassword,
      });
      expect(userRepo.getUserById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(updatedUser);
    });

    it("should throw an error if user is not found", async () => {
      const username = "nonExistentUser";
      const oldPassword = "old_password";
      const newPassword = "new_password";
      const expectedError = new AppError(
        StatusCode.NOT_FOUND,
        "User not found"
      );

      userRepo.getUserIdByUsername.mockResolvedValueOnce(null);

      try {
        await userService.passwordUpdate(username, oldPassword, newPassword);
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.statusCode).toBe(expectedError.statusCode);
        expect(error.message).toBe(expectedError.message);
      }

      expect(userRepo.getUserIdByUsername).toHaveBeenCalledWith(username);
      expect(userRepo.getUserById).not.toHaveBeenCalled();
      expect(authUtil.comparePassword).not.toHaveBeenCalled();
      expect(authUtil.hashPassword).not.toHaveBeenCalled();
      expect(userRepo.updateUser).not.toHaveBeenCalled();
    });

    it("should throw an error if old password is incorrect", async () => {
      const username = "testuser";
      const oldPassword = "old_password";
      const newPassword = "new_password";
      const userId = "12345";
      const user = {
        id: userId,
        username: "testuser",
        password: "hashed_old_password",
      };
      const expectedError = new AppError(
        StatusCode.NOT_FOUND,
        "User not found"
      );

      userRepo.getUserIdByUsername.mockResolvedValueOnce(userId);
      userRepo.getUserById.mockResolvedValueOnce(user);
      authUtil.comparePassword.mockResolvedValueOnce(false);

      try {
        await userService.passwordUpdate(username, oldPassword, newPassword);
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.statusCode).toBe(expectedError.statusCode);
        expect(error.message).toBe(expectedError.message);
      }

      expect(userRepo.getUserIdByUsername).toHaveBeenCalledWith(username);
      expect(userRepo.getUserById).toHaveBeenCalledWith(userId);
      expect(authUtil.comparePassword).toHaveBeenCalledWith(
        oldPassword,
        user.password
      );
      expect(authUtil.hashPassword).not.toHaveBeenCalled();
      expect(userRepo.updateUser).not.toHaveBeenCalled();
    });
  });

  describe("updateImage", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should update a user's image", async () => {
      const username = "testuser";
      const imageUrl = "http://example.com/image.jpg";
      const imagePublicId = "public_id";
      const userId = "12345";
      const user = { id: userId, username: "testuser" };
      const updatedUser = {
        id: userId,
        username: "testuser",
        imageUrl,
        imagePublicId,
      };

      userRepo.getUserIdByUsername.mockResolvedValueOnce(userId);
      userRepo.getUserById.mockResolvedValueOnce(user);
      userRepo.updateUser.mockResolvedValueOnce();
      userRepo.getUserById.mockResolvedValueOnce(updatedUser);

      const result = await userService.updateImage(
        username,
        imageUrl,
        imagePublicId
      );

      expect(userRepo.getUserIdByUsername).toHaveBeenCalledWith(username);
      expect(userRepo.getUserById).toHaveBeenCalledWith(userId);
      expect(userRepo.updateUser).toHaveBeenCalledWith(userId, {
        imageUrl,
        imagePublicId,
      });
      expect(userRepo.getUserById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(new userDto(updatedUser));
    });

    it("should throw an error if user is not found", async () => {
      const username = "testuser";
      const imageUrl = "http://example.com/image.jpg";
      const imagePublicId = "public_id";

      const expectedError = new AppError(
        StatusCode.NOT_FOUND,
        "User not found"
      );

      userRepo.getUserIdByUsername.mockResolvedValueOnce(null);

      try {
        await userService.updateImage(username, imageUrl, imagePublicId);
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.statusCode).toBe(expectedError.statusCode);
        expect(error.message).toBe(expectedError.message);
      }

      expect(userRepo.getUserIdByUsername).toHaveBeenCalledWith(username);
      expect(userRepo.updateUser).not.toHaveBeenCalled();
    });
  });

  // describe('deleteUserImage', () => {
  //   it('should delete a user\'s image', async () => {

  //     const username = 'testuser';
  //     const userId = '12345';
  //     const imagePublicId = 'public_id';
  //     const user = { id: userId, username: 'testuser', imageUrl: 'http://example.com/image.jpg', imagePublicId };

  //     userRepo.getUserIdByUsername.mockResolvedValueOnce(userId);
  //     userRepo.getUserById.mockResolvedValueOnce(user);
  //     userRepo.updateUser.mockResolvedValueOnce();
  //     userRepo.getUserById.mockResolvedValueOnce({ id: userId, username: 'testuser', imageUrl: null, imagePublicId: null });
  //     authUtil.deleteImage.mockResolvedValueOnce();

  //     const result = await userService.deleteUserImage(username);

  //     expect(userRepo.getUserIdByUsername).toHaveBeenCalledWith(username);
  //     expect(userRepo.getUserById).toHaveBeenCalledWith(userId);
  //     expect(userRepo.updateUser).toHaveBeenCalledWith(userId, { imageUrl: null, imagePublicId: null });
  //     expect(authUtil.deleteImage).toHaveBeenCalledWith(imagePublicId);
  //     expect(userRepo.getUserById).toHaveBeenCalledWith(userId);
  //     expect(result).toEqual({ id: userId, username: 'testuser', imageUrl: null, imagePublicId: null });
  //   });

  //   it('should throw an error if user is not found', async () => {
  //     const username = 'testuser';

  //     userRepo.getUserIdByUsername.mockResolvedValueOnce(null);

  //     await expect(userService.deleteUserImage(username)).rejects.toThrow('User not found');
  //   });
  // });

  // describe('deleteUser', () => {
  //   it('should delete a user', async () => {
  //     const username = 'testuser';
  //     const password = 'password';
  //     const userId = '12345';
  //     const user = { id: userId, username: 'testuser', password: 'hashed_password' };

  //     userRepo.getUserIdByUsername.mockResolvedValueOnce(userId);
  //     userRepo.getUserById.mockResolvedValueOnce(user);
  //     authUtil.comparePassword.mockResolvedValueOnce(true);
  //     userRepo.deleteUser.mockResolvedValueOnce();

  //     await userService.deleteUser(username, password);

  //     expect(userRepo.getUserIdByUsername).toHaveBeenCalledWith(username);
  //     expect(userRepo.getUserById).toHaveBeenCalledWith(userId);
  //     expect(authUtil.comparePassword).toHaveBeenCalledWith(password, user.password);
  //     expect(userRepo.deleteUser).toHaveBeenCalledWith(userId);
  //   });

  //   it('should throw an error if user is not found', async () => {
  //     const username = 'testuser';
  //     const password = 'password';

  //     userRepo.getUserIdByUsername.mockResolvedValueOnce(null);

  //     await expect(userService.deleteUser(username, password)).rejects.toThrow('User not found');
  //   });

  //   it('should throw an error if password is incorrect', async () => {
  //     const username = 'testuser';
  //     const password = 'password';
  //     const userId = '12345';
  //     const user = { id: userId, username: 'testuser', password: 'hashed_password' };

  //     userRepo.getUserIdByUsername.mockResolvedValueOnce(userId);
  //     userRepo.getUserById.mockResolvedValueOnce(user);
  //     authUtil.comparePassword.mockResolvedValueOnce(false);

  //     await expect(userService.deleteUser(username, password)).rejects.toThrow('Password is incorrect');
  //   });
  // });
});
