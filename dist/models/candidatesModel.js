"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _connection = _interopRequireDefault(require("../db/connection.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const candidatesModel = _connection.default.define('candidates', {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true
    }
  },
  last_name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
      isEmail: true
    }
  },
  available: {
    type: _sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true
    }
  },
  remuneration: {
    type: _sequelize.DataTypes.DECIMAL,
    allowNull: true,
    validate: {
      isDecimal: true
    }
  },
  description: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  image: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  english_level_id: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      notNull: true,
      notEmpty: true
    }
  },
  seniorities_id: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      notNull: true,
      notEmpty: true
    }
  }
}, {
  timestamps: true,
  createdAt: true,
  updatedAt: true
});

var _default = candidatesModel;
exports.default = _default;