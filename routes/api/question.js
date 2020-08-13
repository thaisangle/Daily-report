const express = require("express");
const router = express.Router();
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", {
  session: false,
});
// const validate = require("../controllers/auth.validate");
const trimRequest = require("trim-request");
const controller = require("../../controllers/api/question.controller");

router.post("/create", controller.create);

router.get("/get-list", controller.getAllQuestion);

router.delete("/:id", controller.deleteQuestion);

router.post("/:id", controller.updateQuestionById);

module.exports = router;
