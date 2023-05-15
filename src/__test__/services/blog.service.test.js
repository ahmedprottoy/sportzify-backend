const blogService = require("../../services/blog.service");
const blogRepo = require("../../repositories/blog.repo");
const userRepo = require("../../repositories/user.repo");
const authUtil = require("../../utils/auth.util");
const AppError = require("../../utils/AppError");
const StatusCode = require("../../utils/Objects/StatusCode");
const blogDto = require("../../dtos/blog.dto");

jest.mock("../../repositories/blog.repo");
jest.mock("../../repositories/user.repo");
jest.mock("../../utils/auth.util");

describe("blogService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createBlog", () => {
    it("should create a new blog", async () => {
      const username = "john_doe"
      const title = "Sample Blog";
      const content = "This is a sample blog";
      const imageUrl = "https://example.com/sample.jpg";
      const imagePublicId = "sample-public-id";
      const newBlog = {
        id: "sample-id",
        username,
        title,
        content,
        imageUrl,
        imagePublicId,
      };

      blogRepo.createBlog.mockResolvedValue(newBlog);

      const result = await blogService.createBlog(
        username,
        title,
        content,
        imageUrl,
        imagePublicId
      );

      expect(blogRepo.createBlog).toHaveBeenCalledWith(
        username,
        title,
        content,
        imageUrl,
        imagePublicId
      );

      expect(result).toEqual(new blogDto(newBlog));
    });
  });

  describe("getAllBlogs", () => {
    it("should retrieve all blogs", async () => {
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

      blogRepo.getAllBlogs.mockResolvedValue(blogs);

      const result = await blogService.getAllBlogs();

      expect(blogRepo.getAllBlogs).toHaveBeenCalled();
      expect(result).toEqual(blogs.map((blog) => new blogDto(blog)));
    });
  });

  describe("getBlogById", () => {
    it("should retrieve a blog by ID", async () => {
      const blogId = "sample-id";
      const blog = {
        id: blogId,
        title: "Sample Blog",
        content: "This is a sample blog",
        username: "john_doe",
      };

      blogRepo.getBlogById.mockResolvedValue(blog);

      const result = await blogService.getBlogById(blogId);

      expect(blogRepo.getBlogById).toHaveBeenCalledWith(blogId);
      expect(result).toEqual(new blogDto(blog));
    });
  });

  describe("updateBlog", () => {
    it("should update a blog", async () => {
      const blogId = "sample-id";
      const modifiedBody = {
        title: "Updated Blog",
        content: "This is the updated blog content",
      };
      const blog = {
        id: blogId,
        title: "Original Blog",
        content: "Original content",
        username: "john_doe",
      };
      const updatedBlog = {
        ...blog,
        ...modifiedBody,
      };

      blogRepo.getBlogById.mockResolvedValue(blog);
      blogRepo.updateBlog.mockResolvedValue();
      blogRepo.getBlogById.mockResolvedValue(updatedBlog);

      const result = await blogService.updateBlog(blogId, modifiedBody);

      expect(blogRepo.getBlogById).toHaveBeenCalledWith(blogId);
      expect(blogRepo.updateBlog).toHaveBeenCalledWith(blogId, modifiedBody);
      expect(blogRepo.getBlogById).toHaveBeenCalledWith(blogId);
      expect(result).toEqual(new blogDto(updatedBlog));
    });

    it("should throw an AppError if no blog is found with the provided ID", async () => {
      const blogId = "non-existent-id";

      blogRepo.getBlogById.mockResolvedValue(null);

      await expect(blogService.updateBlog(blogId, {})).rejects.toThrow(
        new AppError(StatusCode.NOT_FOUND, "No blog found with this id")
      );

      expect(blogRepo.getBlogById).toHaveBeenCalledWith(blogId);
      expect(blogRepo.updateBlog).not.toHaveBeenCalled();
    });
  });

  describe("deleteBlog", () => {
    it("should delete a blog if the user is authorized", async () => {
      const username = "john_doe";
      const blogId = "sample-id";
      const blog = {
        id: blogId,
        title: "Sample Blog",
        content: "This is a sample blog",
        username,
        imagePublicId: "sample-public-id",
        user_id: "user-id",
      };

      blogRepo.getBlogById.mockResolvedValue(blog);
      userRepo.getUserIdByUsername.mockResolvedValue("user-id");

      await blogService.deleteBlog(username, blogId);

      expect(blogRepo.getBlogById).toHaveBeenCalledWith(blogId);
      expect(userRepo.getUserIdByUsername).toHaveBeenCalledWith(username);
      expect(blogRepo.deleteBlog).toHaveBeenCalledWith(blogId);
      expect(authUtil.deleteImage).toHaveBeenCalledWith(blog.imagePublicId);
    });

    it("should throw an AppError if no blog is found with the provided ID", async () => {
      const username = "john_doe";
      const blogId = "non-existent-id";

      blogRepo.getBlogById.mockResolvedValue(null);

      await expect(blogService.deleteBlog(username, blogId)).rejects.toThrow(
        new AppError(StatusCode.NOT_FOUND, "No blog found with this id")
      );

      expect(blogRepo.getBlogById).toHaveBeenCalledWith(blogId);
      expect(userRepo.getUserIdByUsername).not.toHaveBeenCalled();
      expect(blogRepo.deleteBlog).not.toHaveBeenCalled();
      expect(authUtil.deleteImage).not.toHaveBeenCalled();
    });

    it("should throw an AppError if the user is not authorized to delete the blog", async () => {
      const username = "john_doe";
      const blogId = "sample-id";
      const blog = {
        id: blogId,
        title: "Sample Blog",
        content: "This is a sample blog",
        username: "another_user",
        imagePublicId: "sample-public-id",
        user_id: "another-user-id",
      };

      blogRepo.getBlogById.mockResolvedValue(blog);
      userRepo.getUserIdByUsername.mockResolvedValue("user-id");

      await expect(blogService.deleteBlog(username, blogId)).rejects.toThrow(
        new AppError(
          StatusCode.UNAUTHORIZED,
          "You are not authorized to delete this blog"
        )
      );

      expect(blogRepo.getBlogById).toHaveBeenCalledWith(blogId);
      expect(userRepo.getUserIdByUsername).toHaveBeenCalledWith(username);
      expect(blogRepo.deleteBlog).not.toHaveBeenCalled();
      expect(authUtil.deleteImage).not.toHaveBeenCalled();
    });
  });
});
