"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recruiterRoutes = void 0;

var _express = require("express");

var _recruitersController = require("../controllers/recruitersController.js");

var _validateToken = require("../middlewares/validateToken.js");

const router = (0, _express.Router)();
exports.recruiterRoutes = router;
router.route('/').get(_validateToken.verifyToken, _recruitersController.getRecruiters).post(_recruitersController.postRecruiter);
router.route('/:recruiter_id').get(_validateToken.verifyToken, _recruitersController.getRecruiter).put(_validateToken.verifyToken, _recruitersController.putRecruiter).delete(_validateToken.verifyToken, _recruitersController.deleteRecruiter);