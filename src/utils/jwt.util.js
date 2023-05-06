const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

exports.generateAccessToken = async (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

exports.verifyAccessToken = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

exports.getCookie = async (req) => {
  return req.cookies.authorization || req.headers.authorization;
};

// exports.generateRefreshToken = (userId) => {
//     const token = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
//         expiresIn: "7d",
//     });
//     return token;
//     }

// exports.verifyRefreshToken = (token) => {
//         return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
//         }

// exports.generateResetToken = (userId) => {
//     const token = jwt.sign({ userId }, process.env.JWT_RESET_SECRET, {
//         expiresIn: "1h",
//     });
//     return token;
//     }

// exports.verifyResetToken = (token) => {
//         return jwt.verify(token, process.env.JWT_RESET_SECRET);
//         }
