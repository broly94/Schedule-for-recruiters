"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const verifyToken = async (req, res, next) => {
  const token = await req.header('token');
  if (!token) return res.status(401).json({
    error: true,
    message: 'Error, Access Denied'
  });

  try {
    const dataValidated = _jsonwebtoken.default.verify(token, process.env.TOKEN_SECRET);

    req.user = dataValidated;
    next();
  } catch (e) {
    console.log(e.message);
    res.json({
      error: true,
      message: e.message
    });
  }
};

exports.verifyToken = verifyToken;