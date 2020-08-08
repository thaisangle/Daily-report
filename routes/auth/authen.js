var express = require("express");
var router = express.Router();
var controller = require("../../controllers/cms/auth.controller")
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/login',controller.login);
router.post('/getuser',controller.getUserById);


module.exports = router;
