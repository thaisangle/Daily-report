var express = require("express");
var router = express.Router();
var controller = require("../../controllers/api/auth.controller")
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/login',controller.login);
router.post('/refreshtoken',controller.refreshToken);
router.post('/getuser',controller.getUserById);


module.exports = router;
