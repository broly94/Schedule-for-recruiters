"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = void 0;

var _recruitersModel = _interopRequireDefault(require("../models/recruitersModel.js"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;
    const recruiter = await _recruitersModel.default.findAll({
      where: {
        email
      }
    });
    if (recruiter.length === 0) res.status(404).json({
      error: true,
      message: 'Error, this recruiter doest not exist'
    });
    const data = recruiter.map(e => {
      return {
        email: e.email,
        password: e.password
      };
    });
    const [dataRecruiter] = data;

    const validationPassword = _bcrypt.default.compareSync(password, dataRecruiter.password);

    if (!validationPassword) res.status(404).json({
      error: true,
      message: "Error, do you not can not get into"
    });

    const token = _jsonwebtoken.default.sign({
      email: dataRecruiter.email,
      password: dataRecruiter.password
    }, process.env.TOKEN_SECRET, {
      expiresIn: 60 * 60
    });

    res.header('token', token);
    res.status(200).json({
      error: false,
      message: "Welcome",
      token
    });
  } catch (e) {
    console.log(e.message);
    res.json({
      error: true,
      message: e.message
    });
  }
};

exports.login = login;