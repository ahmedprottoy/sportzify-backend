const userService = require('../../services/user.service');
const userRepo = require('../../repositories/user.repo');
const authUtil = require('../../utils/auth.util');

jest.mock("../../repositories/user.repo");
jest.mock("../../utils/auth.util");

describe('userService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('user', () => {
    it('should retrieve a user by username', async () => {
      const username = 'testuser';
      const userId = '12345';
      const user = { id: userId, username: 'testuser' };
      const expectedUserDto = { id: userId, username: 'testuser' };

      userRepo.getUserIdByUsername.mockResolvedValueOnce(userId);
      userRepo.getUserById.mockResolvedValueOnce(user);

      const result = await userService.user(username);

      expect(userRepo.getUserIdByUsername).toHaveBeenCalledWith(username);
      expect(userRepo.getUserById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(expectedUserDto);
    });

    it('should throw an error if user is not found', async () => {
      const username = 'testuser';

      userRepo.getUserIdByUsername.mockResolvedValueOnce(null);

      await expect(userService.user(username)).rejects.toThrow('User not found');
    });
  });

  describe('updateUser', () => {
    it('should update a user with the provided modified body', async () => {
      const username = 'testuser';
      const updateBody = { name: 'John Doe' };
      const password = 'password';
      const userId = '12345';
      const user = { id: userId, username: 'testuser', password: 'hashed_password' };
      const updatedUser = { id: userId, username: 'testuser', name: 'John Doe' };
      const expectedUserDto = { id: userId, username: 'testuser', name: 'John Doe' };

      userRepo.getUserIdByUsername.mockResolvedValueOnce(userId);
      userRepo.getUserById.mockResolvedValueOnce(user);
      authUtil.comparePassword.mockResolvedValueOnce(true);
      userRepo.updateUser.mockResolvedValueOnce();
      userRepo.getUserById.mockResolvedValueOnce(updatedUser);

      const result = await userService.updateUser(username, updateBody, password);

      expect(userRepo.getUserIdByUsername).toHaveBeenCalledWith(username);
      expect(userRepo.getUserById).toHaveBeenCalledWith(userId);
      expect(authUtil.comparePassword).toHaveBeenCalledWith(password, user.password);
      expect(userRepo.updateUser).toHaveBeenCalledWith(userId, updateBody);
      expect(userRepo.getUserById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(expectedUserDto);
    });

    it('should throw an error if user is not found', async () => {
      const username = 'testuser';
      const updateBody = { name: 'John Doe' };
      const password = 'password';

      userRepo.getUserIdByUsername.mockResolvedValueOnce(null);

      await expect(userService.updateUser(username, updateBody, password)).rejects.toThrow('User not found');
    });

    it('should throw an error if password is incorrect', async () => {
      const username = 'testuser';
      const updateBody = { name: 'John Doe' };
      const password = 'password';
      const userId = '12345';
      const user = { id: userId, username: 'testuser', password: 'hashed_password' };

      userRepo.getUserIdByUsername.mockResolvedValueOnce(userId);
      userRepo.getUserById.mockResolvedValueOnce(user);
      authUtil.comparePassword.mockResolvedValueOnce(false);

      await expect(userService.updateUser(username, updateBody, password)).rejects.toThrow('Password is incorrect');
    });
  });

  describe('passwordUpdate', () => {
    it('should update a user\'s password', async () => {
      const username = 'testuser';
      const oldPassword = 'old_password';
      const newPassword = 'new_password';
      const userId = '12345';
      const user = { id: userId, username: 'testuser', password: 'hashed_old_password' };
      const hashedNewPassword = 'hashed_new_password';
      const updatedUser = { id: userId, username: 'testuser', password: hashedNewPassword };

      userRepo.getUserIdByUsername.mockResolvedValueOnce(userId);
      userRepo.getUserById.mockResolvedValueOnce(user);
      authUtil.comparePassword.mockResolvedValueOnce(true);
      authUtil.hashPassword.mockResolvedValueOnce(hashedNewPassword);
      userRepo.updateUser.mockResolvedValueOnce();
      userRepo.getUserById.mockResolvedValueOnce(updatedUser);

      const result = await userService.passwordUpdate(username, oldPassword, newPassword);

      expect(userRepo.getUserIdByUsername).toHaveBeenCalledWith(username);
      expect(userRepo.getUserById).toHaveBeenCalledWith(userId);
      expect(authUtil.comparePassword).toHaveBeenCalledWith(oldPassword, user.password);
      expect(authUtil.hashPassword).toHaveBeenCalledWith(newPassword);
      expect(userRepo.updateUser).toHaveBeenCalledWith(userId, { password: hashedNewPassword });
      expect(userRepo.getUserById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(updatedUser);
    });

    it('should throw an error if user is not found', async () => {
      const username = 'testuser';
      const oldPassword = 'old_password';
      const newPassword = 'new_password';

      userRepo.getUserIdByUsername.mockResolvedValueOnce(null);

      await expect(userService.passwordUpdate(username, oldPassword, newPassword)).rejects.toThrow('User not found');
    });

    it('should throw an error if old password is incorrect', async () => {
      const username = 'testuser';
      const oldPassword = 'old_password';
      const newPassword = 'new_password';
      const userId = '12345';
      const user = { id: userId, username: 'testuser', password: 'hashed_old_password' };

      userRepo.getUserIdByUsername.mockResolvedValueOnce(userId);
      userRepo.getUserById.mockResolvedValueOnce(user);
      authUtil.comparePassword.mockResolvedValueOnce(false);

      await expect(userService.passwordUpdate(username, oldPassword, newPassword)).rejects.toThrow('Password is incorrect');
    });
  });

  describe('allBlogs', () => {
    it('should retrieve all blogs of a user', async () => {
      const username = 'testuser';
      const userId = '12345';
      const user = { id: userId, username: 'testuser' };
      const blog1 = { id: '1', title: 'Blog 1', userId: userId };
      const blog2 = { id: '2', title: 'Blog 2', userId: userId };
      const expectedBlogDtos = [
        { id: '1', title: 'Blog 1', userId: userId },
        { id: '2', title: 'Blog 2', userId: userId },
      ];

      userRepo.getUserIdByUsername.mockResolvedValueOnce(userId);
      userRepo.getUserById.mockResolvedValueOnce(user);
      userRepo.allBlogs.mockResolvedValueOnce([blog1, blog2]);

      const result = await userService.allBlogs(username);

      expect(userRepo.getUserIdByUsername).toHaveBeenCalledWith(username);
      expect(userRepo.getUserById).toHaveBeenCalledWith(userId);
      expect(userRepo.allBlogs).toHaveBeenCalledWith(userId);
      expect(result).toEqual(expectedBlogDtos);
    });

    it('should throw an error if user is not found', async () => {
     
      const username = 'testuser';
      const userId = '12345';

      userRepo.getUserIdByUsername.mockResolvedValueOnce(userId);
      userRepo.getUserById.mockResolvedValueOnce(null);

      await expect(userService.allBlogs(username)).rejects.toThrow('User not found');
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const username = 'testuser';
      const password = 'password';
      const userId = '12345';
      const user = { id: userId, username: 'testuser', password: 'hashed_password' };

      userRepo.getUserIdByUsername.mockResolvedValueOnce(userId);
      userRepo.getUserById.mockResolvedValueOnce(user);
      authUtil.comparePassword.mockResolvedValueOnce(true);
      userRepo.deleteUser.mockResolvedValueOnce();

      await userService.deleteUser(username, password);

      expect(userRepo.getUserIdByUsername).toHaveBeenCalledWith(username);
      expect(userRepo.getUserById).toHaveBeenCalledWith(userId);
      expect(authUtil.comparePassword).toHaveBeenCalledWith(password, user.password);
      expect(userRepo.deleteUser).toHaveBeenCalledWith(userId);
    });

    it('should throw an error if user is not found', async () => {
      const username = 'testuser';
      const password = 'password';

      userRepo.getUserIdByUsername.mockResolvedValueOnce(null);

      await expect(userService.deleteUser(username, password)).rejects.toThrow('User not found');
    });

    it('should throw an error if password is incorrect', async () => {
      const username = 'testuser';
      const password = 'password';
      const userId = '12345';
      const user = { id: userId, username: 'testuser', password: 'hashed_password' };

      userRepo.getUserIdByUsername.mockResolvedValueOnce(userId);
      userRepo.getUserById.mockResolvedValueOnce(user);
      authUtil.comparePassword.mockResolvedValueOnce(false);

      await expect(userService.deleteUser(username, password)).rejects.toThrow('Password is incorrect');
    });
  });

  describe('updateImage', () => {
    it('should update a user\'s image', async () => {
      const username = 'testuser';
      const imageUrl = 'http://example.com/image.jpg';
      const imagePublicId = 'public_id';
      const userId = '12345';
      const user = { id: userId, username: 'testuser' };
      const updatedUser = { id: userId, username: 'testuser', imageUrl, imagePublicId };

      userRepo.getUserIdByUsername.mockResolvedValueOnce(userId);
      userRepo.getUserById.mockResolvedValueOnce(user);
      userRepo.updateUser.mockResolvedValueOnce();
      userRepo.getUserById.mockResolvedValueOnce(updatedUser);

      const result = await userService.updateImage(username, imageUrl, imagePublicId);

      expect(userRepo.getUserIdByUsername).toHaveBeenCalledWith(username);
      expect(userRepo.getUserById).toHaveBeenCalledWith(userId);
      expect(userRepo.updateUser).toHaveBeenCalledWith(userId, { imageUrl, imagePublicId });
      expect(userRepo.getUserById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(updatedUser);
    });

    it('should throw an error if user is not found', async () => {
      const username = 'testuser';
      const imageUrl = 'http://example.com/image.jpg';
      const imagePublicId = 'public_id';

      userRepo.getUserIdByUsername.mockResolvedValueOnce(null);

      await expect(userService.updateImage(username, imageUrl, imagePublicId)).rejects.toThrow('User not found');
    });
  });

  describe('deleteUserImage', () => {
    it('should delete a user\'s image', async () => {
     
      const username = 'testuser';
      const userId = '12345';
      const imagePublicId = 'public_id';
      const user = { id: userId, username: 'testuser', imageUrl: 'http://example.com/image.jpg', imagePublicId };

      userRepo.getUserIdByUsername.mockResolvedValueOnce(userId);
      userRepo.getUserById.mockResolvedValueOnce(user);
      userRepo.updateUser.mockResolvedValueOnce();
      userRepo.getUserById.mockResolvedValueOnce({ id: userId, username: 'testuser', imageUrl: null, imagePublicId: null });
      authUtil.deleteImage.mockResolvedValueOnce();

      const result = await userService.deleteUserImage(username);

      expect(userRepo.getUserIdByUsername).toHaveBeenCalledWith(username);
      expect(userRepo.getUserById).toHaveBeenCalledWith(userId);
      expect(userRepo.updateUser).toHaveBeenCalledWith(userId, { imageUrl: null, imagePublicId: null });
      expect(authUtil.deleteImage).toHaveBeenCalledWith(imagePublicId);
      expect(userRepo.getUserById).toHaveBeenCalledWith(userId);
      expect(result).toEqual({ id: userId, username: 'testuser', imageUrl: null, imagePublicId: null });
    });

    it('should throw an error if user is not found', async () => {
      const username = 'testuser';

      userRepo.getUserIdByUsername.mockResolvedValueOnce(null);

      await expect(userService.deleteUserImage(username)).rejects.toThrow('User not found');
    });
  });
});

