const express = require("express");
const router = express.Router();
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", {
  session: false,
});
// const validate = require("../controllers/auth.validate");
const middleware = require("../../middlewares/authentication/authorization")
const trimRequest = require("trim-request");
const controller = require("../../controllers/cms/report.controller");

/**
 * Register route
 */
router.post(
  "/register",
  controller.creater
);
// router.get("/getList",middleware,controller.getListReport)

module.exports = router;