"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.putRecruiter = exports.postRecruiter = exports.getRecruiters = exports.getRecruiter = exports.deleteRecruiter = void 0;

var _recruitersModel = _interopRequireDefault(require("../models/recruitersModel.js"));

var _validationEmail = require("../helpers/recruiter/validationEmail.js");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Schema model recruiter
//Bcrypt
const saltRounds = 10;

const getRecruiters = async (req, res) => {
  try {
    const recruiters = await _recruitersModel.default.findAll();
    if (recruiters.length === 0) res.status(404).json({
      error: true,
      message: 'Error, could not get recruiters'
    });
    const {
      email
    } = req.user;
    res.status(200).json({
      error: false,
      userLogin: email,
      recruiters
    });
  } catch (e) {
    console.log(e.message);
    res.json({
      error: true,
      message: e.message
    });
  }
};

exports.getRecruiters = getRecruiters;

const getRecruiter = async (req, res) => {
  try {
    const {
      recruiter_id
    } = req.params;
    const recruiter = await _recruitersModel.default.findAll({
      where: {
        id: recruiter_id
      }
    });

    if (recruiter.length == 0) {
      return res.status(404).json({
        error: true,
        message: 'Error, cloud not get the recruiter'
      });
    }

    const {
      email
    } = req.user;
    return res.status(200).json({
      error: false,
      userLogin: email,
      data: recruiter
    });
  } catch (e) {
    console.log(e.message);
    res.json({
      error: true,
      message: e.message
    });
  }
};

exports.getRecruiter = getRecruiter;

const postRecruiter = async (req, res) => {
  try {
    const {
      name,
      last_name,
      email,
      password,
      is_premium
    } = req.body; //Hash password

    const salt = _bcrypt.default.genSaltSync(saltRounds);

    const hash = _bcrypt.default.hashSync(password, salt); //Validation email


    const validationEmail = await (0, _validationEmail.emailUnique)(req, res);
    if (validationEmail.length === 1) return res.status(400).json({
      error: true,
      message: 'Error, there is already a recruiter in database'
    }); //Validate is_premium 

    const premiumNumber = parseInt(is_premium);
    const recruiter = await _recruitersModel.default.create({
      name,
      last_name,
      email,
      password: hash,
      is_premium: premiumNumber
    });
    if (recruiter.length === 0) res.status(400).json({
      error: true,
      message: 'Error, could is not created recruiter'
    });
    res.status(200).json({
      error: false,
      message: "Recruiter created",
      data: recruiter
    });
  } catch (e) {
    console.log(e.message);
    res.json({
      error: true,
      message: e.message
    });
  }
};

exports.postRecruiter = postRecruiter;

const putRecruiter = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      name,
      last_name,
      password
    } = req.body; //get Email

    const {
      email
    } = await (0, _validationEmail.getEmail)(req); //Hash password

    const salt = _bcrypt.default.genSaltSync(saltRounds);

    const hash = _bcrypt.default.hashSync(password, salt);

    const response = await _recruitersModel.default.update({
      name,
      last_name,
      email,
      password: hash
    }, {
      where: {
        id_recruiter: id
      }
    });
    if (response === 0) return res.status(404).json({
      error: true,
      message: "Error, could not updated recruiter"
    });
    const userLogin = req.user;
    return res.json({
      error: false,
      userLogin: userLogin.email,
      message: 'Updated recruiter'
    });
  } catch (e) {
    console.log(e.message);
    res.json({
      error: true,
      message: e.message
    });
  }
};

exports.putRecruiter = putRecruiter;

const deleteRecruiter = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await _recruitersModel.default.destroy({
      where: {
        id_recruiter: id
      }
    });
    if (response === 0) return res.status(400).json({
      error: true,
      message: "Error, could not deleted recruiter"
    });
    const {
      email
    } = req.user;
    return res.json({
      error: false,
      userLogin: email,
      message: "Deleted recruiter"
    });
  } catch (e) {
    console.log(e.message);
    res.json({
      error: true,
      message: e.message
    });
  }
};

exports.deleteRecruiter = deleteRecruiter;