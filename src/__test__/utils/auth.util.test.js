const bcrypt = require("bcrypt");
const cloudinary = require("../../config/cloudinary.config");
const authUtil = require("../../utils/auth.util");

describe("authUtil", () => {
  const password = "password123";
  const hashedPassword =
    "$2b$10$X/PIcJcTs2zLmR84VZqQZehq1tQI6tbv8zY3Qh.H6jwvNls2lnwL6";

  it("should hash the provided password", async () => {
    const hashed = await authUtil.hashPassword(password);

    expect(hashed).not.toBe(password);
    expect(await bcrypt.compare(password, hashed)).toBe(true);
  });


  it("should set a cookie in the response", async () => {
    const res = {
      cookie: jest.fn(),
    };
    const token = "dummyToken";

    await authUtil.setCookie(res, token);

    expect(res.cookie).toHaveBeenCalledWith("authorization", token, {
      httpOnly: true,
      sameSite: "none",
      secure: false,
    });
  });

  it("should destroy the cookie in the response", async () => {
    const res = {
      clearCookie: jest.fn(),
    };

    await authUtil.destroyCookie(res);

    expect(res.clearCookie).toHaveBeenCalledWith("authorization");
  });

  it("should delete an image from Cloudinary", async () => {
    const imageId = "image123";

    cloudinary.uploader.destroy = jest.fn();

    await authUtil.deleteImage(imageId);

    expect(cloudinary.uploader.destroy).toHaveBeenCalledWith(imageId);
  });
});
