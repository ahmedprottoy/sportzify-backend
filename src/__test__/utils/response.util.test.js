const sendResponse = require("../../utils/response.util");
const js2xmlparser = require("js2xmlparser");

describe("sendResponse", () => {
  let req, res, statusCode, message, data;

  beforeEach(() => {
    req = {
      headers: {
        accept: "",
      },
    };
    res = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    statusCode = 200;
    message = "OK";
    data = { foo: "bar" };
  });

  it("should send JSON response by default", () => {
    sendResponse(req, res, statusCode, message, data);

    expect(res.status).toHaveBeenCalledWith(statusCode);
    expect(res.json).toHaveBeenCalledWith({ message, data });
    expect(res.setHeader).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  it('should send XML response if accept header is "application/xml"', () => {
    req.headers.accept = "application/xml";
    const xml =
      "<response><message>OK</message><data><foo>bar</foo></data></response>";
    js2xmlparser.parse = jest.fn().mockReturnValueOnce(xml);

    sendResponse(req, res, statusCode, message, data);

    expect(res.status).toHaveBeenCalledWith(statusCode);
    expect(res.setHeader).toHaveBeenCalledWith(
      "content-type",
      "application/xml"
    );
    expect(js2xmlparser.parse).toHaveBeenCalledWith("response", {
      message,
      data,
    });
    expect(res.send).toHaveBeenCalledWith(xml);
    expect(res.json).not.toHaveBeenCalled();
  });
});
