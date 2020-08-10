const express = require("express");
const router = express.Router();
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", {
  session: false,
});
// const validate = require("../controllers/auth.validate");
const trimRequest = require("trim-request");
const controller = require("../../controllers/api/question.controller");

/**
 * Register route
 */
router.post(
  "/register",
  controller.create
);
router.get("/listQuestion",controller.list_report)
module.exports = router;