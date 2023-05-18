const cloudinary = require("../../config/cloudinary.config");
const AppError = require("../../utils/AppError");
const StatusCode = require("../../utils/Objects/StatusCode");
const fileUpload = require("../../middlewares/fileUpload.middleware");

describe("uploadImage", () => {
  it("should upload the image to Cloudinary and pass control to the next middleware", async () => {
    const req = { file: { buffer: Buffer.from("image data") } };
    const res = {};
    const next = jest.fn();

    // Mock the upload_stream function of cloudinary.uploader
    cloudinary.uploader.upload_stream = jest
      .fn()
      .mockImplementation((options, callback) => {
        callback(null, {
          public_id: "image_id",
          url: "https://cloudinary.com/image_id",
        });
      });

    await fileUpload.uploadImage(req, res, next);

    expect(cloudinary.uploader.upload_stream).toHaveBeenCalledWith(
      { resource_type: "auto",folder:"sportzify" },
      expect.any(Function)
    );
    expect(req.file).toEqual({
      public_id: "image_id",
      url: "https://cloudinary.com/image_id",
    });
    expect(next).toHaveBeenCalled();
  });

  it("should throw an error if failed to upload the image to Cloudinary", async () => {
    const req = { file: { buffer: Buffer.from("image data") } };
    const res = {};
    const next = jest.fn();

    // Mock the upload_stream function of cloudinary.uploader
    cloudinary.uploader.upload_stream = jest
      .fn()
      .mockImplementation((options, callback) => {
        callback(new Error("Upload failed"));
      });

    
    try{
        await fileUpload.uploadImage(req, res, next);
    }catch(error){
        expect(error.statusCode).toBe(StatusCode.INTERNAL_SERVER_ERROR);
        expect(error.message).toBe("Failed to upload image");
        expect(next).not.toHaveBeenCalled();
    }
  });
});
