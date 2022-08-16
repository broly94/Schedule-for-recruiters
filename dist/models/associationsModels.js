"use strict";

var _candidatesModel = _interopRequireDefault(require("./candidatesModel.js"));

var _englishLevelModel = _interopRequireDefault(require("./englishLevelModel.js"));

var _senioritiesModel = _interopRequireDefault(require("./senioritiesModel.js"));

var _socialMediaModel = _interopRequireDefault(require("./socialMediaModel.js"));

var _technologiesModel = _interopRequireDefault(require("./technologiesModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//candidates association
_candidatesModel.default.hasOne(_socialMediaModel.default, {
  foreignKey: 'candidate_id'
});

_candidatesModel.default.belongsTo(_englishLevelModel.default, {
  foreignKey: 'english_level_id'
});

_candidatesModel.default.belongsTo(_senioritiesModel.default, {
  foreignKey: 'seniorities_id'
});

_candidatesModel.default.belongsToMany(_technologiesModel.default, {
  through: 'candidatestechnologies'
});

_technologiesModel.default.belongsToMany(_candidatesModel.default, {
  through: 'candidatestechnologies'
});