const js2xmlparser = require("js2xmlparser");

const sendResponse = (req, res, statusCode, message, data) => {
  const response = {
    message: message,
    data: data,
  };

  console.log(response.data);

  if (req.headers.accept === "application/xml") {
    res.setHeader("content-type", "application/xml");
    const xml = js2xmlparser.parse("response", response);

    return res.status(statusCode).send(xml);
  }

  return res.status(statusCode).json(response);
};

module.exports = sendResponse;
