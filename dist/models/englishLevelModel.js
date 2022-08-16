"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _connection = _interopRequireDefault(require("../db/connection.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const englishLevelModel = _connection.default.define('english_level', {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  level: {
    type: _sequelize.DataTypes.STRING
  }
}, {
  timestamps: false
});

var _default = englishLevelModel;
exports.default = _default;