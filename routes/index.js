const express = require("express");
const router = express.Router();
const fs = require("fs");
const routesPath = `${__dirname}/`;
const { removeExtensionFromFile } = require("../helper/utils");
const authorization = require('../middlewares/authentication/authorization');

/*
 * Load routes statically and/or dynamically
 */

// Load Auth API
router.use("/auth", require("./auth/authen"));

//test dữ liệu
router.use("/user",require("./api/user"));
router.use("/setting",authorization(),require("./api/setting"))
router.use("/report",authorization(),require("./api/report"))
router.use("/question",authorization(),require("./api/question"))
router.use("/answer",authorization(),require("./api/answer"))




// Loop routes path and loads every file as a route except this file and Auth route
// fs.readdirSync(routesPath).filter((file) => {
//   // Take filename and remove last part (extension)
//   const routeFile = removeExtensionFromFile(file);
//   // Prevents loading of this file and auth file
//   return routeFile !== "index" && routeFile !== "auth"
//     ? router.use(`/${routeFile}`, require(`./${routeFile}`))
//     : "";
// });

/*
 * Setup routes for index
 */
router.get("/", (req, res) => {
  res.render("index");
});

/*
 * Handle 404 error
 */
router.use("/", (req, res) => {
  res.status(404).json({
    errors: {
      msg: "URL_NOT_FOUND",
    },
  });
});

module.exports = router;
