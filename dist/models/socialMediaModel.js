"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _connection = _interopRequireDefault(require("../db/connection.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const socialMediaModel = _connection.default.define('social_media', {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  candidate_id: {
    type: _sequelize.DataTypes.INTEGER,
    unique: true
  },
  facebook: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  instagram: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  linkedin: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: false
});

var _default = socialMediaModel;
exports.default = _default;