const express = require("express");
const router = express.Router();
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", {
  session: false,
});
// const validate = require("../controllers/auth.validate");
const trimRequest = require("trim-request");
const controller = require("../../controllers/api/setting.controller");

router.post("/create", controller.create);
router.post("/update/:id", controller.updateTimeReportById);
router.get("/get-setting", controller.getAllSetting);

module.exports = router;
