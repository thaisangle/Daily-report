const express = require("express");
const router = express.Router();
const passport = require("passport");

// const validate = require("../controllers/auth.validate");
// const trimRequest = require("trim-request");
// const validate = require('../../middlewares/validator/report.validator')
const controller = require("../../controllers/api/report.controller");
// const validate = require('../../middlewares/validator/report.validator')
const { body, validationResult } = require('express-validator');


/**
 * Register route
 */
router.post(
  "/create",
  [
    body('user_id').notEmpty(),
  // password must be at least 5 chars long
    body('answer').notEmpty(),
  ],
  controller.create
);
router.get("/get_list_report",controller.get_list_report)

module.exports = router;