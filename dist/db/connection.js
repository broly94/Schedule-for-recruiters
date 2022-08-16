"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

const DB_NAME = process.env.DB_NAME || 'leoneldev_schedule_v2';
const DB_HOST = process.env.DB_HOST || 'localhost';
const sequelize = new _sequelize.Sequelize(DB_NAME, 'leoneldev', 'leonel_dev', {
  host: DB_HOST,
  dialect: 'mysql'
});

const ConnectionInit = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

ConnectionInit();
var _default = sequelize;
exports.default = _default;