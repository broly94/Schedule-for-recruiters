"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginRoutes = void 0;

var _express = require("express");

var _loginController = require("../controllers/loginController.js");

const router = (0, _express.Router)();
exports.loginRoutes = router;
router.post('/', _loginController.login);