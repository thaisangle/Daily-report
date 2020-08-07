const jwt = require("jsonwebtoken");
const User = require("../models/users");

const utils = require("../middlewares/utils");
const auth = require("../middlewares/auth");
const emailer = require("../middlewares/emailer");
const { expires } = require("mongoose/lib/utils");
const Role = require("../models/roles");
const ROLE_USER_NAME = "user";
const { to, ReE, ReS } = require("../services/util.service");

/********************
 * Public functions *
 ********************/
/**
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Object} next - next
 */

exports.register = async (req, res, next) => {
  try {
    const typeRoles = await Role.find({});
    const typeUser = await typeRoles.find(
      (roleUser) => roleUser.name === ROLE_USER_NAME
    );
    
    // createUser()
    const user = await new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: typeUser._id,
    });
    // if (err) {
    //   res.status(404);
    // } else {
      await emailer.emailExists(req.body.email);
      const userSaved = await user.save();
      return ReS(res, { success: "Registered successfully!", user: userSaved }, 200);
    // }
  } catch (error) {
    utils.handleError(res, error);
  }
};
