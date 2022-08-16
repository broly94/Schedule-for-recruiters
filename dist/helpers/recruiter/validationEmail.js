"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEmail = exports.emailUnique = void 0;

var _recruitersModel = _interopRequireDefault(require("../../models/recruitersModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const emailUnique = async req => {
  const {
    email
  } = req.body;
  const recruiter = await _recruitersModel.default.findAll({
    where: {
      email
    }
  });
  return recruiter;
};

exports.emailUnique = emailUnique;

const getEmail = async req => {
  const id = req.params.id;
  const recruiter = await _recruitersModel.default.findAll({
    where: {
      id
    }
  });
  const email = recruiter.map(e => e.email);
  return email;
};

exports.getEmail = getEmail;