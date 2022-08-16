"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _connection = _interopRequireDefault(require("../db/connection.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const recruitersModel = _connection.default.define('recruiters', {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: _sequelize.DataTypes.STRING,
    validate: {
      notEmpty: true,
      notNull: true
    },
    allowNull: false
  },
  last_name: {
    type: _sequelize.DataTypes.STRING
  },
  email: {
    type: _sequelize.DataTypes.STRING,
    notEmpty: true,
    notNull: true,
    allowNull: false,
    validate: {
      isEmail: true
    },
    unique: true
  },
  password: {
    type: _sequelize.DataTypes.STRING,
    validate: {
      notEmpty: true,
      notNull: true
    },
    allowNull: false
  },
  is_premium: {
    type: _sequelize.DataTypes.BOOLEAN,
    notEmpty: true,
    notNull: true,
    allowNull: false
  }
}, {
  timestamps: true,
  createdAt: true,
  updatedAt: true
});

var _default = recruitersModel;
exports.default = _default;