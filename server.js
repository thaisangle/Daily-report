const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const path = require("path");
const passport = require("passport");
// const expressValidator = require('express-validator');
const cors = require("cors")
const initMongo = require("./config/mongo")
require('dotenv-safe').config()



//Setup COSR
// var allowedOrigins = ['http://localhost:3000',
//                       'https://daily-report.vercel.app',
//                       'https://daily-report-git-devhuy.stdiohue.vercel.app'
//                     ];
// app.use(cors({
//   origin: function(origin, callback){
//     // allow requests with no origin 
//     // (like mobile apps or curl requests)
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){
//       var msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// }));
// app.use(cors())
// var corsOptions = {
//   origin:"*",
//   methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
//   preflightContinue: false,
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// app.use(cors(corsOptions))
// // app.options('*', cors()) // include before other routes
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Setup express server port from ENV, default: 3000
app.set("port", process.env.PORT || 3000);

// Enable only in development HTTP request logger middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Redis cache enabled by env variable
if (process.env.USE_REDIS === "true") {
  const getExpeditiousCache = require("express-expeditious");
  const cache = getExpeditiousCache({
    namespace: "expresscache",
    defaultTtl: "1 minute",
    engine: require("expeditious-engine-redis")({
      redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    }),
  });
  app.use(cache);
}

// for parsing json
app.use(
  bodyParser.json({
    limit: "20mb",
  })
);
// for parsing application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    limit: "20mb",
    extended: true,
  })
);
// validate request
// app.use(expressValidator());

// Init all other stuff
app.use(cors());
app.use(passport.initialize());
app.use(helmet());
app.use(express.static("public"));
app.set("views", path.join(__dirname, "./views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(require("./routes"));
app.listen(app.get("port"));

// Init MongoDB
initMongo();

module.exports = app;
