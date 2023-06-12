const {
  createBlog,
  allBlogs,
  singleBlog,
  updateBlog,
  deleteBlog,
} = require("../../controllers/blog.controller");
const blogService = require("../../services/blog.service");
const AppError = require("../../utils/AppError");
const StatusCode = require("../../utils/Objects/StatusCode");

jest.mock("../../services/blog.service");

describe("blogController", () => {
  describe("createBlog", () => {
    it("should create a new blog and return the created blog", async () => {
      const req = {
        user: { username: "testuser" },
        body: { title: "Test Blog", content: "Test content" },
        file: { url: "http://example.com/image.jpg", public_id: "imageId" },
        headers:{accept:"application/json"}
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const createdBlog = {
        id: 1,
        title: "Test Blog",
        content: "Test content",
      };

      blogService.createBlog.mockResolvedValueOnce(createdBlog);

      await createBlog(req, res);

      expect(blogService.createBlog).toHaveBeenCalledWith(
        req.user.username,
        req.body.title,
        req.body.content,
        req.file.url,
        req.file.public_id
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Blog created successfully",
        data: createdBlog,
      });
    });
  });

  describe("allBlogs", () => {
    it("should fetch all blogs and return an array of blogs", async () => {
      const req = {headers:{accept:"application/json"}};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const blogs = [
        { id: 1, title: "Blog 1", content: "Content 1" },
        { id: 2, title: "Blog 2", content: "Content 2" },
      ];

      blogService.getAllBlogs.mockResolvedValueOnce(blogs);

      await allBlogs(req, res);

      expect(blogService.getAllBlogs).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Blogs fetched successfully",
        data: blogs,
      });
    });
  });

  describe("singleBlog", () => {
    it("should fetch a single blog by ID and return the blog", async () => {
      const req = {
        params: { id: 1 },
        headers: { accept: "application/json" },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const blog = { id: 1, title: "Test Blog", content: "Test content" };

      blogService.getBlogById.mockResolvedValueOnce(blog);

      await singleBlog(req, res);

      expect(blogService.getBlogById).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Blog fetched successfully",
        data: blog,
      });
    });

    it("should throw an AppError if no blog is found with the provided ID", async () => {
      const req = {
        params: { id: 1 },
        headers: { accept: "application/json" },
      };
      const expectedError = new AppError(
        StatusCode.NOT_FOUND,
        "No blog found with this id"
      );
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      blogService.getBlogById.mockResolvedValueOnce(null);

      try{
        await singleBlog(req, res)
      }catch(error){
        expect(error).toBeInstanceOf(AppError);
        expect(error.statusCode).toBe(expectedError.statusCode);
        expect(error.message).toBe(expectedError.message);
      }

      expect(blogService.getBlogById).toHaveBeenCalledWith(req.params.id);
    });
  });

  describe("updateBlog", () => {
    it("should update a blog and return the updated blog", async () => {
      const req = {
        params: { id: 1 },
        body: { title: "Updated Blog" },
        headers: { accept: "application/json" },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const updatedBlog = {
        id: 1,
        title: "Updated Blog",
        content: "Test content",
      };

      blogService.updateBlog.mockResolvedValueOnce(updatedBlog);

      await updateBlog(req, res);

      expect(blogService.updateBlog).toHaveBeenCalledWith(
        req.params.id,
        req.body
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Blog updated successfully",
        data: updatedBlog,
      });
    });
  });

  describe("deleteBlog", () => {
    it("should delete a blog", async () => {
      const req = {
        params: { id: 1 },
        user: { username: "testuser" },
        headers: { accept: "application/json" },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await deleteBlog(req, res);

      expect(blogService.deleteBlog).toHaveBeenCalledWith(
        req.user.username,
        req.params.id
      );
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledWith({
        message: "Blog deleted successfully",
      });
    });
  });
});
