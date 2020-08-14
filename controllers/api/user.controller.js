const jwt = require("jsonwebtoken");
const User = require("../../models/users");
const bcrypt = require('bcryptjs');

const utils = require("../../helper/utils");
const auth = require("../../helper/auth");
const emailer = require("../../helper/isExits/emailer");

const { expires } = require("mongoose/lib/utils");
const { to, ReE, ReS } = require("../../services/util.service");

/********************
 * Public functions *
 ********************/
/**
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Object} next - next
 */

exports.crearte = async (req, res, next) => {
    try {
      // Store hash in your password DB.
      const user = await  new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
      });
      await emailer.emailExists(req.body.email);
      const userSaved =await user.save();
      return ReS(res, { success: "Registered successfully!", user: userSaved }, 200);
    
  } catch (error) {
    utils.handleError(res, error);
  }
 
}
