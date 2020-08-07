var express = require("express");
var router = express.Router();
var controller = require("../controllers/auth.controller")
var bodyParser = require("body-parser");
const { route } = require("./user");
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//middleware_authentication
// router.get("/",controller.index)
// router.post("/",urlencodedParser,controller.add)
router.post('/login',controller.login);
router.post('/getuser',controller.getUserById);

module.exports = router;
