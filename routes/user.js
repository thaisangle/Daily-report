const express = require("express");
const router = express.Router();
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", {
  session: false,
});
// const validate = require("../controllers/auth.validate");
const trimRequest = require("trim-request");
const controller = require("../controllers/user.controller");

/**
 * Register route
 */
router.post(
  "/register",
  trimRequest.all,
  controller.register
);

module.exports = router;