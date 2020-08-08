const jwt = require("jsonwebtoken");
const User = require("../../models/users");

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
    // const typeRoles = await Role.find({});
    // const typeUser = await typeRoles.find(
    //   (roleUser) => roleUser.name === ROLE_USER_NAME
    // );
    
    // createUser()
    const user = await new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      avatar: "123.jpg",
    });
  
      await emailer.emailExists(req.body.email);
      const userSaved = await user.save();
      return ReS(res, { success: "Registered successfully!", user: userSaved }, 200);
    // }
  } catch (error) {
    utils.handleError(res, error);
  }
};
