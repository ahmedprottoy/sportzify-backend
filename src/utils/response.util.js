const js2xmlparser = require("js2xmlparser");

/**
 * Sends a response to the client.
 * @function
 * @name sendResponse
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Response message
 * @param {Object} data - Response data
 * @returns {Object} The response object.
 * @see sendResponse
 */
const sendResponse = (req, res, statusCode, message, data) => {
  const response = {
    message: message,
    data: data,
  };

  if (req.headers.accept === "application/xml") {
    res.setHeader("content-type", "application/xml");
    const xml = js2xmlparser.parse("response", response);
    return res.status(statusCode).send(xml);
  }

  return res.status(statusCode).json(response);
};

module.exports = sendResponse;

/**
 * Represents a module for handling response related utilities and content negotiation.
 * @module responseUtil
 */