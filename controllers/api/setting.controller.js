const jwt = require("jsonwebtoken");
const Setting = require("../../models/setting");


const utils = require("../../helper/utils");
const auth = require("../../helper/auth");
const settingName = require("../../helper/isExits/setting");
const { expires } = require("mongoose/lib/utils");
const ROLE_USER_NAME = "user";
const { to, ReE, ReS } = require("../../services/util.service");
const { body } = require("trim-request");

/********************
 * Public functions *
 ********************/
/**
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Object} next - next
 */

exports.create = async (req, res, next) => {
  try {
      await settingName.settingExists(req.body.name);
      const setting = await new Setting({
        settingName :req.body.name,
        settingValue : req.body.value
      });
      const settingSave = await setting.save();
      return ReS(res, { success: "Registered successfully!", setting: settingSave }, 200);
    // }
  } catch (error) {
    utils.handleError(res, error);
  }
};
