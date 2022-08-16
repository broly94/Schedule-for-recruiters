"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _connection = _interopRequireDefault(require("../db/connection.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const technologiesModel = _connection.default.define('technologies', {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  technology: {
    type: _sequelize.DataTypes.STRING
  }
}, {
  timestamps: false
});

var _default = technologiesModel;
exports.default = _default;