"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.candidatesRoutes = void 0;

var _express = require("express");

var _candidatesController = require("../controllers/candidatesController.js");

const router = (0, _express.Router)();
exports.candidatesRoutes = router;
router.route('/').post(_candidatesController.postCandidate).get(_candidatesController.getCandidates);
router.route('/:id').get(_candidatesController.getCandidate).put(_candidatesController.putCandidate).delete(_candidatesController.deleteCandidate);