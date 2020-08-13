const jwt = require("jsonwebtoken");
// const Setting = require("../../models/setting");
import Setting, { SettingTimeReportMoDel } from "../../models/setting";

const utils = require("../../helper/utils");
const settingName = require("../../helper/isExits/setting");
const ROLE_USER_NAME = "user";
const { to, ReE, ReS } = require("../../services/util.service");
const { body } = require("trim-request");
const mongoose = require("mongoose");

const SETTING_TIME_REPORT = "Setting default test";

/********************
 * Public functions *
 ********************/
/**
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Object} next - next
 */

module.exports = {
  create: async (req, res, next) => {
    try {
      const { name, dayStart, dayEnd, start, end } = req.body;
      const settingId = new mongoose.mongo.ObjectId();

      const newSettingTimeReport = new SettingTimeReportMoDel({
        dayStart: dayStart,
        dayEnd: dayEnd,
        start: start,
        end: end,
      });

      const newSetting = new Setting({
        _id: settingId,
        settingName: name,
        settingValue: newSettingTimeReport,
      });

      const settingSaved = await newSetting.save();
      ReS(res, { success: "Created!", setting: settingSaved }, 200);
    } catch (error) {
      utils.handleError(res, error);
    }
  },

  updateTimeReportById: async (req, res, next) => {
    try {
      const id = req.params.id;

      const setting = await Setting.findOne({ _id: id });
      if (!setting) return ReE(res, { error: "Not found" }, 404);

      const { settingValue } = req.body;

      await Setting.updateOne(
        { _id: id },
        {
          $set: {
            "settingValue.dayStart": settingValue.dayStart,
            "settingValue.dayEnd": settingValue.dayEnd,
            "settingValue.start": settingValue.start,
            "settingValue.end": settingValue.end,
          },
        },
        { upsert: true },
        async (err) => {
          if (err) utils.handleError(res, error);

          const settingSaved = await Setting.findOne({ _id: id });
          ReS(res, { data: settingSaved }, 200);
        }
      );
    } catch (error) {
      utils.handleError(res, error);
    }
  },
  getAllSetting: async (req, res, next) => {
    try {
      const setting = await Setting.find({});
      if (!setting) return ReE(res, { error: "Not found" }, 404);

      ReS(res, { data: setting }, 200);
    } catch (error) {
      utils.handleError(res, error);
    }
  },
};