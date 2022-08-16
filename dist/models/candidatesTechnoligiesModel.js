"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _connection = _interopRequireDefault(require("../db/connection.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const candidatesTechnologiesModel = _connection.default.define('candidatestechnologies', {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  createdAt: {
    type: _sequelize.DataTypes.DATE
  },
  updatedAt: {
    type: _sequelize.DataTypes.DATE
  },
  candidateId: {
    type: _sequelize.DataTypes.INTEGER
  },
  technologiId: {
    type: _sequelize.DataTypes.INTEGER
  }
}, {
  timestamps: true
});

var _default = candidatesTechnologiesModel;
exports.default = _default;