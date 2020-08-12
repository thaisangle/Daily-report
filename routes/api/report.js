const express = require("express");
const router = express.Router();
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", {
  session: false,
});
// const validate = require("../controllers/auth.validate");
const middleware = require("../../middlewares/authentication/authorization")
const trimRequest = require("trim-request");
// const validate = require('../../middlewares/validator/report.validator')
const controller = require("../../controllers/api/report.controller");
const validate = require('../../middlewares/validator/report.validator')
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
// router.get("/getList",middleware,controller.getListReport)

module.exports = router;