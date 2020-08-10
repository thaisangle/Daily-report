const express = require("express");
const router = express.Router();
const passport = require("passport");

// const validate = require("../controllers/auth.validate");
const trimRequest = require("trim-request");
const controller = require("../../controllers/api/answer.controller");

/**
 * Register route
 */
router.post(
  "/register",
  controller.create
);

module.exports = router;