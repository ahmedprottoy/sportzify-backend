const userController = require("../../controllers/user.controller");
const userService = require("../../services/user.service");
const AppError = require("../../utils/AppError");
const StatusCode = require("../../utils/Objects/StatusCode");

jest.mock("../../services/user.service");

describe("userController", () => {
  describe("user", () => {
    it("should fetch user by username", async () => {
      const req = {
        params: { username: "testuser" },
        headers: { accept: "application/json" },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const user = { username: "testuser", name: "Test User" };

      userService.user.mockResolvedValueOnce(user);

      await userController.user(req, res);

      expect(userService.user).toHaveBeenCalledWith(req.params.username);
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
      expect(res.json).toHaveBeenCalledWith({
        message: "User fetched successfully",
        data: user,
      });
    });
  });

    describe("allBlogs", () => {
      it("should fetch all blogs of a user", async () => {
        const req = {
          params: { username: "testuser" },
          headers: { 'accept': "application/json" },
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const blogs = [{ title: "Blog 1" }, { title: "Blog 2" }];

        userService.allBlogs.mockResolvedValueOnce(blogs);

        await userController.allBlogs(req, res);

        expect(userService.allBlogs).toHaveBeenCalledWith(req.params.username);
        expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
        expect(res.json).toHaveBeenCalledWith({
          message: "Blogs fetched successfully",
          data: blogs,
        });
      });
    });

    describe("updateUser", () => {
      it("should update user by username", async () => {
        const req = {
          params: { username: "testuser" },
          body: { name: "Updated User" },
          user: { username: "testuser" },
          headers: { accept: "application/json" },
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const updatedUser = { username: "testuser", name: "Updated User" };

        userService.updateUser.mockResolvedValueOnce(updatedUser);

        await userController.updateUser(req, res);

        expect(userService.updateUser).toHaveBeenCalledWith(
          req.params.username,
          req.body,
          undefined
        );
        expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
        expect(res.json).toHaveBeenCalledWith({
          message: "User updated successfully",
          data: updatedUser,
        });
      });

      it("should throw an AppError if user is not allowed to perform the action", async () => {
        const req = {
          params: { username: "testuser" },
          body: { name: "Updated User" },
          user: { username: "otheruser" },
          headers: { accept: "application/json" },
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

       

        try{
            await userController.updateUser(req, res);
        }catch(error){
            expect(error).toBeInstanceOf(AppError);
            expect(error.statusCode).toBe(StatusCode.FORBIDDEN);
            expect(error.message).toBe("You are not allowed to perform this action.");
        }

        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
      });
    });

    


    describe("passwordUpdate", () => {
      it("should update user password by username", async () => {
        const req = {
          params: { username: "testuser" },
          body: { oldPassword: "oldpass", newPassword: "newpass" },
          user: { username: "testuser" },
          headers:{accept: "application/json"}
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        userService.passwordUpdate.mockResolvedValueOnce(true);

        await userController.passwordUpdate(req, res);

        expect(userService.passwordUpdate).toHaveBeenCalledWith(
          req.params.username,
          req.body.oldPassword,
          req.body.newPassword
        );
        expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
        expect(res.json).toHaveBeenCalledWith({
          message: "Password updated successfully",
        });
      });

      it("should throw an AppError if user is not allowed to perform the action", async () => {
        const req = {
          params: { username: "testuser" },
          body: { oldPassword: "oldpass", newPassword: "newpass" },
          user: { username: "otheruser" },
          headers:{accept: "application/json"}
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        try {
          await userController.passwordUpdate(req, res);
        } catch (error) {
          expect(error).toBeInstanceOf(AppError);
          expect(error.statusCode).toBe(StatusCode.FORBIDDEN);
          expect(error.message).toBe(
            "You are not allowed to perform this action."
          );
        }
    

        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
      });
    });

    describe("updateImage", () => {
      it("should update user image by username", async () => {
        const req = {
          params: { username: "testuser" },
          file: { url: "image-url", public_id: "image-public-id" },
          user: { username: "testuser" },
          headers: { accept: "application/json" },
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const updatedUser = {
          username: "testuser",
          name: "Test User",
          imageUrl: "image-url",
          imagePublicId: "image-public-id",
        };

        userService.updateImage.mockResolvedValueOnce(updatedUser);

        await userController.updateImage(req, res);

        expect(userService.updateImage).toHaveBeenCalledWith(
          req.params.username,
          req.file.url,
          req.file.public_id
        );
        expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
        expect(res.json).toHaveBeenCalledWith({
          message: "Image updated successfully",
          data: updatedUser,
        });
      });

      it("should throw an AppError if user is not allowed to perform the action", async () => {
        const req = {
          params: { username: "testuser" },
          file: { url: "image-url", public_id: "image-public-id" },
          user: { username: "otheruser" },
          headers: { accept: "application/json" },
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        
        try{
            await userController.updateImage(req, res);
        }catch(error){
            expect(error).toBeInstanceOf(AppError);
            expect(error.statusCode).toBe(StatusCode.FORBIDDEN);
            expect(error.message).toBe("You are not allowed to perform this action.");
        }

        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
      });
    });

    describe("deleteUserImage", () => {
      it("should delete user image by username", async () => {
        const req = {
          params: { username: "testuser" },
          user: { username: "testuser" },
          headers: { accept: "application/json" },
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const updatedUser = {
          username: "testuser",
          name: "Test User",
          imageUrl: null,
          imagePublicId: null,
        };

        userService.deleteUserImage.mockResolvedValueOnce(updatedUser);

        await userController.deleteUserImage(req, res);

        expect(userService.deleteUserImage).toHaveBeenCalledWith(
          req.params.username
        );
        expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
        expect(res.json).toHaveBeenCalledWith({
          message: "Image deleted successfully",
          data: updatedUser,
        });
      });

      it("should throw an AppError if user is not allowed to perform the action", async () => {
        const req = {
          params: { username: "testuser" },
          user: { username: "otheruser" },
          headers: { 'accept': "application/json" },
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        
        try{
            await userController.deleteUserImage(req, res);
        }catch(error){
            expect(error).toBeInstanceOf(AppError);
            expect(error.statusCode).toBe(StatusCode.FORBIDDEN);
            expect(error.message).toBe("You are not allowed to perform this action.");
        }

        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
      });
});
});
