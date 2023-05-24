const blogRepo = require("../../repositories/blog.repo");
const User = require("../../models/user.model");
const Blog = require("../../models/blog.model");

jest.mock("../../models/user.model");
jest.mock("../../models/blog.model");

describe("blogRepo", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
  describe("createBlog", () => {
    it("should create a new blog", async () => {
      const username = "testuser";
      const title = "Test Blog";
      const content = "This is a test blog.";
      const imageUrl = "https://example.com/image.jpg";
      const imagePublicId = "public_id";
      const user = { user_id: "123", username };
      const mockBlog = {
        id: 1,
        title,
        content,
        imageUrl,
        imagePublicId,
        user_id: user.user_id,
      };

      User.findOne.mockResolvedValueOnce(user);
      Blog.create.mockResolvedValueOnce(mockBlog);

      const result = await blogRepo.createBlog(
        username,
        title,
        content,
        imageUrl,
        imagePublicId
      );

      expect(User.findOne).toHaveBeenCalledWith({ where: { username } });
      expect(Blog.create).toHaveBeenCalledWith({
        title,
        content,
        imageUrl,
        imagePublicId,
        user_id: user.user_id,
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      });
      expect(result).toEqual(mockBlog);
      expect(result.username).toEqual(user.username);
    });
  });

  describe("getAllBlogs", () => {
    it("should get all blogs", async () => {
      const mockBlogs = [
        { id: 1, title: "Blog 1" },
        { id: 2, title: "Blog 2" },
      ];

      Blog.findAll.mockResolvedValueOnce(mockBlogs);

      const result = await blogRepo.getAllBlogs();

      expect(Blog.findAll).toHaveBeenCalledWith({
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      });
      expect(result).toEqual(mockBlogs);
    });
  });

  describe("getBlogById", () => {
    it("should get a blog by ID", async () => {
      const blogId = 1;
      const mockBlog = { id: blogId, title: "Test Blog" };

      Blog.findByPk.mockResolvedValueOnce(mockBlog);

      const result = await blogRepo.getBlogById(blogId);

      expect(Blog.findByPk).toHaveBeenCalledWith(blogId, {
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      });
      expect(result).toEqual(mockBlog);
    });
  });

  describe("updateBlog", () => {
    it("should update a blog", async () => {
      const blogId = 1;
      const modifiedBody = { title: "Updated Blog" };

      await blogRepo.updateBlog(blogId, modifiedBody);

      expect(Blog.update).toHaveBeenCalledWith(modifiedBody, {
        where: { blog_id: blogId },
      });
    });
  });

  describe("deleteBlog", () => {
    it("should delete a blog", async () => {
      const blogId = 1;

      await blogRepo.deleteBlog(blogId);

      expect(Blog.destroy).toHaveBeenCalledWith({
        where: { blog_id: blogId },
      });
    });
  });
});
