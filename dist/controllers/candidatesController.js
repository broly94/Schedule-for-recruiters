"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.putCandidate = exports.postCandidate = exports.getCandidates = exports.getCandidate = exports.deleteCandidate = void 0;

var _candidatesModel = _interopRequireDefault(require("../models/candidatesModel.js"));

var _candidatesTechnoligiesModel = _interopRequireDefault(require("../models/candidatesTechnoligiesModel.js"));

var _englishLevelModel = _interopRequireDefault(require("../models/englishLevelModel.js"));

var _senioritiesModel = _interopRequireDefault(require("../models/senioritiesModel.js"));

var _socialMediaModel = _interopRequireDefault(require("../models/socialMediaModel.js"));

var _technologiesModel = _interopRequireDefault(require("../models/technologiesModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getCandidates = async (req, res) => {
  try {
    const candidates = await _candidatesModel.default.findAll({
      include: [{
        model: _socialMediaModel.default,
        attributes: ['facebook', 'linkedin', 'instagram']
      }, {
        model: _senioritiesModel.default,
        attributes: ['seniority']
      }, {
        model: _englishLevelModel.default,
        attributes: ['level']
      }, {
        model: _technologiesModel.default,
        through: {
          attributes: []
        },
        attributes: ['technology']
      }]
    });
    if (candidates.length === 0) return res.status(404).json({
      error: true,
      message: 'Error: Not exist candidates in the database'
    });
    res.json({
      candidates
    });
  } catch (e) {
    console.log(e.message);
    res.json({
      error: true,
      message: e.message
    });
  }
};

exports.getCandidates = getCandidates;

const getCandidate = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const candidate = await _candidatesModel.default.findOne({
      where: {
        id
      },
      include: [{
        model: _socialMediaModel.default,
        attributes: ['facebook', 'linkedin', 'instagram']
      }, {
        model: _senioritiesModel.default,
        attributes: ['seniority']
      }, {
        model: _englishLevelModel.default,
        attributes: ['level']
      }, {
        model: _technologiesModel.default,
        through: {
          attributes: []
        },
        attributes: ['technology']
      }]
    });

    if (candidate.length === 0) {
      return res.status(404).json({
        error: true,
        message: 'Error not exist this candidate in the database'
      });
    }

    res.json({
      error: false,
      candidate
    });
  } catch (e) {
    console.log(e.message);
    res.json({
      error: true,
      message: e.message
    });
  }
};

exports.getCandidate = getCandidate;

const putCandidate = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      name,
      last_name,
      email,
      available,
      remuneration,
      description,
      image,
      english_level_id,
      seniorities_id,
      social_media,
      technologies
    } = req.body;
    const candidate = await _candidatesModel.default.update({
      name,
      last_name,
      email,
      available,
      remuneration,
      description,
      image,
      english_level_id,
      seniorities_id
    }, {
      where: {
        id
      }
    }); //Update technologies

    const candidateForId = await _candidatesModel.default.findByPk(id);
    candidateForId.setTechnologies([], {
      through: _candidatesTechnoligiesModel.default
    });

    for (let i = 0; i < technologies.length; i++) {
      const tec = await _technologiesModel.default.findByPk(technologies[i]);
      candidateForId.addTechnologies(tec, {
        through: _candidatesTechnoligiesModel.default
      });
    } //Update social media


    const {
      facebook,
      instagram,
      linkedin
    } = social_media;
    await _socialMediaModel.default.update({
      facebook,
      instagram,
      linkedin
    }, {
      where: {
        id_postulant: id
      }
    });

    if (candidate.length === 0) {
      return res.status(404).json({
        error: true,
        message: 'Error at updating the candidate'
      });
    }

    res.status(200).json({
      erorr: false,
      message: 'Candidate updating correctly'
    });
  } catch (e) {
    console.log(e.message);
    res.json({
      error: true,
      message: e.message
    });
  }
};

exports.putCandidate = putCandidate;

const postCandidate = async (req, res) => {
  try {
    const {
      name,
      last_name,
      email,
      available,
      remuneration,
      description,
      image,
      english_level_id,
      seniorities_id,
      social_media,
      technologies
    } = req.body;
    const newCandidate = await _candidatesModel.default.create({
      name,
      last_name,
      email,
      available,
      remuneration,
      description,
      image,
      english_level_id,
      seniorities_id
    });

    for (let i = 0; i < technologies.length; i++) {
      const tec = await _technologiesModel.default.findByPk(technologies[i]);
      newCandidate.addTechnologies(tec, {
        through: _candidatesTechnoligiesModel.default
      });
    }

    let {
      id
    } = newCandidate;
    const {
      facebook,
      instagram,
      linkedin
    } = social_media;
    await _socialMediaModel.default.create({
      id_candidate: id,
      facebook,
      instagram,
      linkedin
    });
    res.status(200).json({
      message: 'Candidate created',
      newCandidate
    });
  } catch (e) {
    console.log(e.message);
    res.json({
      error: true,
      message: e.message
    });
  }
};

exports.postCandidate = postCandidate;

const deleteCandidate = async (req, res) => {
  try {
    const {
      id
    } = req.params; //Deleted technologies

    const candidateForId = await _candidatesModel.default.findByPk(id);
    candidateForId.removeTechnologies({
      through: _candidatesTechnoligiesModel.default
    }); //Deleted social media

    await _socialMediaModel.default.destroy({
      where: {
        id_postulant: id
      }
    });
    const candidate = await _candidatesModel.default.destroy({
      where: {
        id
      }
    });

    if (candidate.length === 0) {
      return res.status(404).json({
        error: true,
        message: 'Error, not could deleted candidate'
      });
    }

    res.status(200).json({
      error: false,
      message: 'Candidate deleted correctly'
    });
  } catch (e) {
    console.log(e.message);
    res.json({
      error: true,
      message: e.message
    });
  }
};

exports.deleteCandidate = deleteCandidate;